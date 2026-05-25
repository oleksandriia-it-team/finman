export function getOptimalExpenseReductions(
  expenseEntries: Array<{ id: number; sum: number; priority: number }>,
  totalIncome: number,
  totalExpenses: number,
): Set<number> {
  const deficit = totalExpenses - totalIncome;
  if (deficit <= 0) return new Set();

  const sorted = [...expenseEntries].sort((a, b) => a.priority - b.priority);

  const toRemove = new Set<number>();
  let saved = 0;

  for (const entry of sorted) {
    if (saved >= deficit) break;
    toRemove.add(entry.id);
    saved += entry.sum;
  }

  return toRemove;
}
