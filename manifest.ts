import type { DenoManifest } from 'https://deno.land/x/deno_run@0.2.1/types.ts'

export const manifest: DenoManifest = {
  name: 'deno_mocha',
  version: '0.2.0',
  entry: 'deno_mocha.ts',
  permissions: {
    env: true,
    hrtime: true,
    net: true,
    plugin: true,
    read: true,
    run: true,
    write: true
  }
}
