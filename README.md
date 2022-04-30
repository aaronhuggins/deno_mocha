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

The BDD-style library included as part of `deno_std` is slow and blocks adding
more tests in the global scope by running groups of tests too-soon. This wrapper
is completely written to allow all groups of tests to be cached as they are
discovered and then only ran once the top-level `describe` is complete.

Additionally, the internal `TestSuiteInternal` class and exported function call
implementation are overly complex in `deno_std`. Attempting to untangle how the
code works, I found the the concept of discovering test suites was tightly
coupled to how the test suites would be grouped and also to the global test
suite context. These are highly independent abstractions and I felt they should
be loosely coupled. I have attempted to achieve a more loos-coupling, so that
future changes to the abstractions of test suite, test suite groups, and the
global context will be more easily acheived.

This fixes an issue with running BDD-style tests under `denoland/dnt`.

## Note

This library does not fully-implement the BDD-style API from `deno_std`. Below
is a list of known missing API features, which I expect to flesh out over the
next few months I need the features.

- Options bag for `describe` and `it` calls do not extend
  `interface Deno.TestDefinition`
- Function `describe` does not provide `describe.only` or `describe.ignore`
- Function `it` does not provide `it.only` or `it.ignore`
