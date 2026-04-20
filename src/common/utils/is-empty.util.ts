export function isEmpty<T>(value: T | undefined | null | ''): value is undefined | null | '' {
  if (typeof value === 'string') {
    return value.trim() === '';
  }

  return value === null || value === undefined;
}
