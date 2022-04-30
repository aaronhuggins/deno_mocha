# DenoMocha

An intuitive implementation of a BDD-style Deno.test wrapper. No longer relies
on Mocha under-the-hood, in order to take advantage of Deno-specific features.

## Usage

If migrating from Mocha, using this library _might_ be as simple as placing
`import "https://deno.land/x/deno_mocha/global.ts"` at the top of your existing
Mocha tests.

For all other use-cases, please import what you need from `mod.ts`, like so:

```TypeScript
import {
  beforeEach,
  describe,
  it,
} from "https://deno.land/x/deno_mocha/mod.ts";
```

## Why

The BDD-style library included as part of deno_std is slow and blocks adding
more tests in the global scope by running groups of tests too-soon. This wrapper
is completely written to allow all groups of tests to be cached as they are
discovered and then only ran once the top-level `describe` is complete.

This fixes an issue with running BDD-style tests under `denoland/dnt`.
