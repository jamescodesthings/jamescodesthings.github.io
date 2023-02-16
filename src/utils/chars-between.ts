/**
 * Returns an array of characters between a and b
 * @param a The first character
 * @param b The second character
 * @return An Array containing characters between A and B
 */
export function charsBetween(a: string, b: string) {
  const charCodeA = `${a}`.charCodeAt(0);
  const charCodeB = `${b}`.charCodeAt(0);

  let from: number;
  let to: number;

  if (charCodeA <= charCodeB) {
    from = charCodeA;
    to = charCodeB;
  } else {
    from = charCodeB;
    to = charCodeA;
  }

  const diff = to - from + 1;
  return new Array(diff).fill(0).map((_, i) => String.fromCharCode(from + i));
}
