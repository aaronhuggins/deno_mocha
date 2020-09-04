import { assertStrictEquals } from 'https://deno.land/std@0.67.0/testing/asserts.ts'
import { DenoMocha } from '../mod.ts'

DenoMocha.setup()

describe('DenoMocha', () => {
  it('should run execute command', async () => {
    const cmd = Deno.run({
      cmd: [
        'deno',
        'run',
        '--allow-read',
        '--allow-net',
        'deno_mocha.ts',
        '--file',
        '*/SampleSuite.{ts,js}'
      ],
      stdout: 'piped',
      stderr: 'piped'
    })
    const output = await cmd.output()
    const result = new TextDecoder().decode(output)
    
    assertStrictEquals(result.includes('2 passing'), true)
  }).timeout(2500)
})

DenoMocha.run()
