/**
 * Executes a promise with and returns the resolved or rejected response. When the promise
 * resolves, the reject value will be undefined. When the promise rejects, the resolve value
 * will be undefined.
 * @param promise The promise to execute.
 * @returns A tuple where the first argument is the resolve value and the second argument
 * is the reject value. If the promise is resolved, the second value in the tuple will be
 * undefined. If the promise is rejected, the first value in teh tuple will be undefined.
 */
async function execute<T, U>(promise: Promise<unknown>): Promise<[T?, U?]> {
  try {
    return [(await promise) as T, undefined];
  } catch (error: unknown) {
    return [undefined, error as U];
  }
}

/**
 * Holds utility methods for working with promises.
 */
export const promiseHelper = {
  execute,
};
