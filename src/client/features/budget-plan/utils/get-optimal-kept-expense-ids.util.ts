import { getOptimalExpenseReductions } from '@frontend/features/budget-plan/utils/get-optimal-expense-reductions.util';

/**
 * Inverse of {@link getOptimalExpenseReductions}: returns the set of expense ids
 * that should be kept under the optimal budget cut.
 */
export function getOptimalKeptExpenseIds(
  expenseEntries: Array<{ id: number; sum: number; priority: number }>,
  totalIncome: number,
  totalExpenses: number,
): Set<number> {
  const toRemove = getOptimalExpenseReductions(expenseEntries, totalIncome, totalExpenses);
  return new Set(expenseEntries.filter((e) => !toRemove.has(e.id)).map((e) => e.id));
}
