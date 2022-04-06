import {
  describe as describeImpl,
  after as afterImpl,
  afterEach as afterEachImpl,
  before as beforeImpl,
  beforeEach as beforeEachImpl,
  it as itImpl
} from "./mocha.ts";

declare global {
  let describe: typeof describeImpl
  let after: typeof afterImpl
  let afterEach: typeof afterEachImpl
  let before: typeof beforeImpl
  let beforeEach: typeof beforeEachImpl
  let it: typeof itImpl
}

(globalThis as any).describe = describeImpl;
(globalThis as any).it = itImpl;
(globalThis as any).before = beforeImpl;
(globalThis as any).beforeEach = beforeEachImpl;
(globalThis as any).after = afterImpl;
(globalThis as any).afterEach = afterEachImpl;
