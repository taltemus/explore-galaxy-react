async function execute<T, U>(promise: Promise<unknown>): Promise<[T?, U?]> {
  try {
    return [(await promise) as T, undefined];
  } catch (error: unknown) {
    return [undefined, error as U];
  }
}

export const promiseHelper = {
  execute,
};
