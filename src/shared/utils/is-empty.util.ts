export function isEmpty<T>(value: T | undefined | null | ''): value is undefined | null | '' {
  return value === '' || value === null || value === undefined;
}