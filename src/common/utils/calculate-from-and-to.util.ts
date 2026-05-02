export function calculateFromAndTo(page: number, pageSize: number) {
  const from = (page - 1) * pageSize + 1;
  const to = from + pageSize - 1;

  return { from, to };
}
