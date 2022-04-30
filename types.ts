export interface TestSuite<T> {
  symbol: symbol;
}

export type Func<T = unknown> = (
  this: T,
  t: Deno.TestContext,
) => void | PromiseLike<void>;

export type Hook<T> = HookFunc<T> | HookFunc<T>[];
export type HookFunc<T> = (this: T) => void | Promise<void>;
export type HookName = "beforeAll" | "afterAll" | "beforeEach" | "afterEach";

export interface DescribeOpts<T> {
  name: string;
  fn?: () => void;
  /**
   * The `describe` function returns a `TestSuite` representing the group of tests.
   * If `describe` is called within another `describe` calls `fn`, the suite will default to that parent `describe` calls returned `TestSuite`.
   * If `describe` is not called within another `describe` calls `fn`, the suite will default to the `TestSuite` representing the global group of tests.
   */
  suite?: TestSuite<T>;
  /** Run some shared setup before all of the tests in the suite. */
  beforeAll?: Hook<T>;
  /** Run some shared teardown after all of the tests in the suite. */
  afterAll?: Hook<T>;
  /** Run some shared setup before each test in the suite. */
  beforeEach?: Hook<T>;
  /** Run some shared teardown after each test in the suite. */
  afterEach?: Hook<T>;
}

export interface Test<T = unknown> {
  fn: Func<T>;
}
