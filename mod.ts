import './deps.ts'
import type { Mocha, BrowserMocha } from './deps.ts'

/** @hidden */
interface Window { location?: URL }
/** @hidden */
declare var window: Window & typeof globalThis

/** @hidden */
function onFinished (failures: number): void {
  if (failures > 0) {
    Deno.exit(1)
  } else {
    Deno.exit(0)
  }
}

/** Setup mocha on Deno with the given settings options. */
export function setup (options?: Mocha.Interface | Mocha.MochaOptions): BrowserMocha {
  window.location = new URL('http://localhost:0')
  const denoMocha = mocha.setup({ ui: 'bdd', reporter: 'spec', color: true, ...options })

  mocha.checkLeaks()

  return denoMocha
}

/** Run mocha on Deno; automatically exits Deno with the appropriate error code. */
export function run (fn?: (failures: number) => void): Mocha.Runner {
  const denoRun = typeof fn !== 'function'
    ? onFinished
    : fn
  const runner = mocha.run(denoRun)

  runner.globals(['onerror'])

  return runner
}

/** Convenience object encapsulating setup and run for mocha on Deno. */
export const DenoMocha = {
  setup,
  run
}
