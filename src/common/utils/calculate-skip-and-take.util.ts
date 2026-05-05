export function calculateSkipAndLimit(from: number, to: number) {
  const skip = from - 1;
  const take = to - skip;

  return { skip, take };
}
