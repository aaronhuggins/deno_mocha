// deno-lint-ignore-file no-explicit-any
import {
  after as afterImpl,
  afterAll as afterAllImpl,
  afterEach as afterEachImpl,
  before as beforeImpl,
  beforeAll as beforeAllImpl,
  beforeEach as beforeEachImpl,
  describe as describeImpl,
  it as itImpl,
} from "./mod.ts";

declare global {
  let describe: typeof describeImpl;
  let after: typeof afterImpl;
  let afterAll: typeof afterAllImpl;
  let afterEach: typeof afterEachImpl;
  let before: typeof beforeImpl;
  let beforeAll: typeof beforeAllImpl;
  let beforeEach: typeof beforeEachImpl;
  let it: typeof itImpl;
}

(globalThis as any).describe = describeImpl;
(globalThis as any).it = itImpl;
(globalThis as any).after = afterImpl;
(globalThis as any).afterAll = afterAllImpl;
(globalThis as any).afterEach = afterEachImpl;
(globalThis as any).before = beforeImpl;
(globalThis as any).beforeAll = beforeAllImpl;
(globalThis as any).beforeEach = beforeEachImpl;
