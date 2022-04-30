import { BDD } from "./bdd.ts";
import type { DescribeOpts, Func, Hook, TestSuite } from "./types.ts";

export function describe<T = unknown>(name: string): TestSuite<T>;
export function describe<T = unknown>(options: DescribeOpts<T>): TestSuite<T>;
export function describe<T = unknown>(
  name: string,
  fn: () => void,
): TestSuite<T>;
export function describe<T = unknown>(
  suite: TestSuite<T>,
  name: string,
  fn: () => void,
): TestSuite<T>;
export function describe<T = unknown>(
  nameOrSuiteOrOpts: DescribeOpts<T> | TestSuite<T> | string,
  nameOrFn?: string | (() => void),
  func?: () => void,
) {
  return BDD.describe(nameOrSuiteOrOpts, nameOrFn, func);
}

export function it<T = unknown>(name: string, fn: Func<T>): void;
export function it<T = unknown>(
  suite: TestSuite<T>,
  name: string,
  fn: Func<T>,
): void;
export function it<T = unknown>(
  nameOrSuite: TestSuite<T> | string,
  nameOrFn: string | Func<T>,
  func?: Func<T>,
) {
  BDD.it(nameOrSuite, nameOrFn, func);
}

export function before<T = unknown>(fn: Hook<T>) {
  BDD.registerHook("beforeAll", fn);
}

export function beforeAll<T = unknown>(fn: Hook<T>) {
  BDD.registerHook("beforeAll", fn);
}

export function after<T = unknown>(fn: Hook<T>) {
  BDD.registerHook("afterAll", fn);
}

export function afterAll<T = unknown>(fn: Hook<T>) {
  BDD.registerHook("afterAll", fn);
}

export function beforeEach<T = unknown>(fn: Hook<T>) {
  BDD.registerHook("beforeEach", fn);
}

export function afterEach<T = unknown>(fn: Hook<T>) {
  BDD.registerHook("afterEach", fn);
}
