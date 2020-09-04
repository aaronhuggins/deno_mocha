# DenoMocha

An intuitive wrapper for Mocha targeting Deno, supporting both JavaScript and TypeScript tests. Includes a simple CLI tool, `deno_mocha`.

## Usage

### Command-line Interface

Write your mocha tests in a folder named `test`, importing `deno_mocha` module at the top of each test script.
```TypeScript
// filename: test/SampleSuite.ts
import 'https://deno.land/x/deno_mocha/mod.ts'

describe('Sample TS', () => {
  it('should run TypeScript', () => {
    console.log('Sample TypeScript ran!')
  })
})
```

Install `deno_mocha` using Deno cli.
```shell
deno install --allow-all --allow-run https://deno.land/x/deno_mocha/deno_mocha.ts
```

Execute `deno_mocha`; it will find test scripts named according to Mocha conventions and execute them.
```shell
> deno_mocha

  Sample TS
    Sample TypeScript ran!
    ✓ should run TypeScript

  1 passing (2ms)
```

### Want more control?

Import the `setup` and `run` function at the top of your test scripts.

Call `setup()` before declaring the test code, and call `run()` at the end of the script.
```TypeScript
// filename: test/SampleSuite.ts
import { setup, run } from 'https://deno.land/x/deno_mocha/mod.ts'

setup()

describe('Sample TS', () => {
  it('should run TypeScript', () => {
    console.log('Sample TypeScript ran!')
  })
})

run()
```

Execute your test script(s) using `deno`.
```shell
> deno run test/SampleSuite.ts

  Sample TS
    Sample TypeScript ran!
    ✓ should run TypeScript

  1 passing (2ms)
```

## API

For complete API details, please visit the [docs](https://ahuggins-nhs.github.io/deno_mocha/globals.html).

## Future

Near future plans are to support Mocha options by file `.mocharc.json` in the project root, and to expand `deno_mocha` CLI support to match Mocha's more closely.

## Why

The desire is for more feature-parity with testing under Node, but with as little baggage as possible. Mocha is a great test suite, and the familiarity for developers who already use it under Node may help with adopting Deno.

Mocha is the test framework of choice for this developer, and having a simple way to use it in Deno has already helped this developer adopt Deno.

Deno's built-in testing framework is great; Mocha is just different. Sometimes different is good.

## Testing this repository

Run tests in this repository using command:

```shell
deno run --allow-run test/DenoMochaSuite.ts
```

## Credit

This library was inspired by Craig Morten's blog post from June 4, 2020.

Craig Morten - https://dev.to/craigmorten/testing-your-deno-apps-with-mocha-4f35
