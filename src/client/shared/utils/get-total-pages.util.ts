export function getTotalPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize);
}
