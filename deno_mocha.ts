import { globToRegExp, join, normalize, parse, walk } from './deps.ts'
import { run, setup } from './mod.ts'

/** @hidden */
const DEFAULT_BAIL = false
/** @hidden */
const DEFAULT_SPEC_FOLDER = 'test'
/** @hidden */
const DEFAULT_SPEC_FILES = [
  '*Suite.{ts,js}',
  '*.test.{ts,js}',
  '*.spec.{ts,js}'
]

/** @hidden */
function splitFileGlobs (file: string, folder?: string): string[] {
  const splitter = /([-+~@()!:\\/*?A-Za-z0-9_. {,]+[},])/gu

  if (typeof folder === 'string') folder = normalize(folder)

  return file.split(splitter)
    .filter(glob => {
      glob = glob.trim()

      return glob !== '' && glob !== ','
    })
    .map(glob => {
      if (glob.substr(glob.length - 1) === ',') glob = glob.substr(0, glob.length - 1).trim()
      if (glob.substr(0) === ',') glob = glob.substr(1, glob.length).trim()
      if (typeof folder === 'string') return join('.', folder, glob)

      return glob
    })
}

/**
 * Command-line interface for DenoMocha.
 * 
 * 
 * Usage:
 * 
 *   deno_mocha [OPTIONS]
 * 
 * 
 * Options:
 * 
 *   --file    OPTIONAL: A comma-separated list of test script file globs;
 *             uses Mocha file name conventions by default.
 * 
 *   --root    OPTIONAL: A different root folder for searching for test
 *             scripts; defaults to `./test`
 * 
 *   --bail    OPTIONAL: Bail on test script import errors.
 */
async function deno_mocha () {
  const specs: Promise<any>[] = []
  const options = parse(Deno.args)
  const filePatterns = typeof options.file === 'string'
    ? splitFileGlobs(options.file, options.root)
    : DEFAULT_SPEC_FILES.map(glob => {
      if (typeof options.root === 'string') return join('.', normalize(options.root), glob)

      return join('.', DEFAULT_SPEC_FOLDER, glob)
    })
  const fileEntries = walk('.', {
    match: filePatterns.map(glob => globToRegExp(glob))
  })
  const bail = typeof options.bail === 'boolean' ? options.bail : DEFAULT_BAIL
  let importCount = 0

  setup()

  for await (const fileEntry of fileEntries) {
    if (fileEntry.isFile) {
      importCount += 1
      await import('file:///' + join(Deno.cwd(), fileEntry.path).replaceAll('\\', '/'))
    }
  }

  await Promise.all(specs.map(promise => promise.catch(reason => {
    if (bail) return Promise.reject(reason)
  })))

  if (importCount > 0) run()
}

deno_mocha()
