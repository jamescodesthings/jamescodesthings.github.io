/**
 * A fairly safe "random integer between a and b" function.
 * @param a One of the bounds
 * @param b The other bound
 * @return a number between a and b, inclusive.
 */
export const randBetween = (a: number, b: number) => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error(`randBetween(${a}, ${b}) what!?`);
  }
  if (a === b) return a;

  const largest = a > b ? a : b;
  const smallest = a < b ? a : b;
  const diff = largest - smallest;

  return Math.random() * diff + smallest;
};

/**
 * Same as randBetween but rounds to an integer
 * @param a One of the bounds
 * @param b The other bound
 * @return an integer between a and b, inclusive.
 */
export const randBetweenInt = (a: number, b: number) => Math.round(randBetween(a, b));
