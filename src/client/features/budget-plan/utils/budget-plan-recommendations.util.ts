import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';

export function normalizeBudgetPlanRecommendationEntries(
  entries: BudgetPlanDetailed['otherEntries'],
): UpdateBudgetPlanDto['otherEntries'] {
  return entries.map((entry) => ({
    ...entry,
    description: entry.description ?? '',
  })) as UpdateBudgetPlanDto['otherEntries'];
}

export function toggleBudgetPlanRecommendationEntry(
  entries: UpdateBudgetPlanDto['otherEntries'],
  entryId: number,
): UpdateBudgetPlanDto['otherEntries'] {
  return entries.map((entry) =>
    entry.id === entryId
      ? {
          ...entry,
          selected: !entry.selected,
        }
      : entry,
  ) as UpdateBudgetPlanDto['otherEntries'];
}

export function calculateBudgetPlanRecommendationSummary(entries: UpdateBudgetPlanDto['otherEntries']) {
  const selectedEntries = entries.filter((entry) => entry.selected);

  const totalCurrentExpense = entries.reduce(
    (sum, entry) => (entry.type === 'expense' ? sum + (entry.sum ?? 0) : sum),
    0,
  );

  const totalSavings = selectedEntries.reduce(
    (sum, entry) => (entry.type === 'expense' ? sum + (entry.sum ?? 0) : sum),
    0,
  );

  return {
    selectedEntriesCount: selectedEntries.length,
    expenseEntriesCount: entries.filter((entry) => entry.type === 'expense').length,
    totalCurrentExpense,
    totalSavings,
    totalNewExpense: totalCurrentExpense - totalSavings,
  };
}

export function sortBudgetPlanRecommendationEntries(
  entries: UpdateBudgetPlanDto['otherEntries'],
): UpdateBudgetPlanDto['otherEntries'] {
  return [...entries].sort((a, b) => a.priority - b.priority) as UpdateBudgetPlanDto['otherEntries'];
}
