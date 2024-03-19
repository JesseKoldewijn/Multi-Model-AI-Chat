// explain the following function

/**
 * Compare two strings and return a score of how similar they are
 * @param a - first string
 * @param b - second string
 * @returns a score of how similar the strings are
 * @example
 * stringCompare("hello", "hello") // 1
 * stringCompare("hello", "world") // 0
 * stringCompare("hello", "hell") // 0.8
 */
export const stringCompare = (a: string, b: string) => {
  const length = a.length > b.length ? a.length : b.length;
  let score = 0;
  for (let i = 0; i < length; i++) {
    if (a[i] === b[i]) {
      score++;
    }
  }
  return score / length;
};
