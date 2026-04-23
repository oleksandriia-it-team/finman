export function getUniqueItems<T>(data: T[]): T[] {
  return Array.from(new Set(data));
}
