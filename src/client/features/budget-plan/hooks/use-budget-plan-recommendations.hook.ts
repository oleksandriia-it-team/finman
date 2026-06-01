import { useMemo, useState } from 'react';
import { TypeEntry } from '@common/enums/entry.enum';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { getOptimalKeptExpenseIds } from '@frontend/features/budget-plan/utils/get-optimal-kept-expense-ids.util';
import { type MonthOperationItem, useBudgetPlanForm } from '@frontend/features/budget-plan/hooks/use-budget-plan.hook';

interface UseBudgetPlanRecommendationsOptions {
  plannedRegularEntries: RegularEntry[];
  otherEntries: MonthOperationItem[];
  isEdit: boolean;
  onApply: () => void;
}

export function useBudgetPlanRecommendations({
  plannedRegularEntries,
  otherEntries,
  isEdit,
  onApply,
}: UseBudgetPlanRecommendationsOptions) {
  const { submitAsync, state: submitState } = useBudgetPlanForm({ isEdit });

  const expenseEntries = useMemo<MonthOperationItem[]>(
    () => otherEntries.filter((e) => e.type === TypeEntry.Expense).sort((a, b) => a.priority - b.priority),
    [otherEntries],
  );

  const totalIncome = useMemo(
    () =>
      [...plannedRegularEntries, ...otherEntries]
        .filter((e) => e.type === TypeEntry.Income)
        .reduce((sum, e) => sum + e.sum, 0),
    [plannedRegularEntries, otherEntries],
  );

  const totalExpenses = useMemo(
    () =>
      [...plannedRegularEntries, ...otherEntries]
        .filter((e) => e.type === TypeEntry.Expense)
        .reduce((sum, e) => sum + e.sum, 0),
    [plannedRegularEntries, otherEntries],
  );

  const [selectedToKeep, setSelectedToKeep] = useState<Set<number>>(() =>
    getOptimalKeptExpenseIds(expenseEntries, totalIncome, totalExpenses),
  );

  const toggleEntry = (id: number) => {
    setSelectedToKeep((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedSavings = useMemo(
    () => expenseEntries.filter((e) => !selectedToKeep.has(e.id)).reduce((sum, e) => sum + e.sum, 0),
    [expenseEntries, selectedToKeep],
  );

  const newExpenses = totalExpenses - selectedSavings;
  const savingsPercent = totalExpenses > 0 ? Math.round((selectedSavings / totalExpenses) * 100) : 0;

  const removedCount = useMemo(
    () => expenseEntries.filter((e) => !selectedToKeep.has(e.id)).length,
    [expenseEntries, selectedToKeep],
  );

  const applyOptimal = () => {
    setSelectedToKeep(getOptimalKeptExpenseIds(expenseEntries, totalIncome, totalExpenses));
  };

  const plannedRegularEntryIds = useMemo(() => plannedRegularEntries.map((e) => e.id), [plannedRegularEntries]);

  const apply = async () => {
    try {
      await submitAsync({
        plannedRegularEntryIds,
        otherEntries: otherEntries.map((e) =>
          e.type === TypeEntry.Expense ? { ...e, selected: selectedToKeep.has(e.id) } : e,
        ),
      });
      onApply();
    } catch {
      // toast is shown inside useBudgetPlanForm onError
    }
  };

  const skip = async () => {
    try {
      await submitAsync({
        plannedRegularEntryIds,
        otherEntries,
      });
      onApply();
    } catch {
      // toast is shown inside useBudgetPlanForm onError
    }
  };

  return {
    expenseEntries,
    selectedToKeep,
    toggleEntry,
    totalIncome,
    totalExpenses,
    selectedSavings,
    newExpenses,
    savingsPercent,
    removedCount,
    totalCount: expenseEntries.length,
    applyState: submitState,
    apply,
    skip,
    applyOptimal,
  };
}
