// Taken from https://gist.github.com/lucacasonato/54c03bb267074aaa9b32415dbfb25522

// The group for the 'describe' callback we are currently in. If there is no
// current group, we are not in a 'describe' callback.
let currentGroup: Group | undefined;

interface Tester {
  step: (name: string, fn: (t: any) => (Promise<void>)) => Promise<void>
}

interface Group {
  items: Array<[string, Group | Test]>;
  before: Array<Func | AsyncFunc>;
  beforeEach: Array<Func | AsyncFunc>;
  after: Array<Func | AsyncFunc>;
  afterEach: Array<Func | AsyncFunc>;
}

type Done = (err?: any) => void;

/** Callback function used for tests and hooks. */
type Func = (done: Done) => void;

/** Async callback function used for tests and hooks. */
type AsyncFunc = () => PromiseLike<any>;

interface Test {
  fn: Func | AsyncFunc;
}

export function describe(name: string, fn: () => void) {
  // Save the current group so we can restore it after the callback.
  const existingGroup = currentGroup;
  // Create a new group, and set it as the current group.
  const group: Group = currentGroup = {
    items: [],
    before: [],
    beforeEach: [],
    after: [],
    afterEach: [],
  };
  fn();
  // Restore the previous group.
  currentGroup = existingGroup;
  // Add the new group to the existing group if there was one. If there was no
  // existing group, this is the top-level group, so we register the group with
  // `Deno.test`.
  if (existingGroup !== undefined) {
    existingGroup.items.push([name, group]);
  } else {
    Deno.test(name, groupFn(group) as any);
  }
}

// This function returns a function that will run the tests in the given group.
// This is used to register the tests with `Deno.test`.
function groupFn(group: Group): (t: Tester) => Promise<void> {
  return async (t) => {
    // Run the before callbacks.
    for (const fn of group.before) {
      await func(fn);
    }

    for (const [name, item] of group.items) {
      // If the item is a group, recurse into it, else use the test fn.
      const fn = "fn" in item ? () => func(item.fn) : groupFn(item);

      // Register this test with the tester.
      await t.step(name, async (t) => {
        // Run the beforeEach callbacks.
        for (const fn of group.beforeEach) {
          await func(fn);
        }
        // Run the test / group fn.
        await fn(t);

        // Run the afterEach callbacks.
        for (const fn of group.afterEach) {
          await func(fn);
        }
      });
    }

    // Run the after callbacks.
    for (const fn of group.after) {
      await func(fn);
    }
  };
}

function func(fn: Func | AsyncFunc): Promise<void> {
  if (fn.length === 1) {
    return new Promise((resolve, reject) => {
      fn((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  return Promise.resolve((fn as AsyncFunc)());
}

// Register a before callback for the current group. If there is no current
// group, we are not in a 'describe' callback, so we throw an error.
export function before(fn: Func | AsyncFunc) {
  if (currentGroup === undefined) {
    throw new TypeError("Can not call before() outside of a describe().");
  }
  currentGroup.before.push(fn);
}

// Register a beforeEach callback for the current group. If there is no current
// group, we are not in a 'describe' callback, so we throw an error.
export function beforeEach(fn: Func | AsyncFunc) {
  if (currentGroup === undefined) {
    throw new TypeError("Can not call beforeEach() outside of a describe().");
  }
  currentGroup.beforeEach.push(fn);
}

// Register an after callback for the current group. If there is no current
// group, we are not in a 'describe' callback, so we throw an error.
export function after(fn: Func | AsyncFunc) {
  if (currentGroup === undefined) {
    throw new TypeError("Can not call after() outside of a describe().");
  }
  currentGroup.after.push(fn);
}

// Register an afterEach callback for the current group. If there is no current
// group, we are not in a 'describe' callback, so we throw an error.
export function afterEach(fn: Func | AsyncFunc) {
  if (currentGroup === undefined) {
    throw new TypeError("Can not call afterEach() outside of a describe().");
  }
  currentGroup.afterEach.push(fn);
}

export function it(name: string, fn: Func | AsyncFunc) {
  if (currentGroup === undefined) {
    throw new TypeError("Can not call it() outside of a describe().");
  }
  currentGroup.items.push([name, { fn }]);
}
