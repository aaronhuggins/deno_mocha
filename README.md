# DenoMocha

An intuitive implementation of a BDD-style Deno.test wrapper. No longer relies
on Mocha under-the-hood, in order to take advantage of Deno-specific features.

## Why

The BDD-style library included as part of deno_std is slow and blocks adding
more tests in the global scope by running groups of tests too-soon. This wrapper
is completely written to allow all groups of tests to be cached as they are
discovered and then only ran once the top-level `describe` is complete.

This fixes an issue with running BDD-style tests under `denoland/dnt`.
