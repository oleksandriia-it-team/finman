import { useMemo, useState } from 'react';
import { TypeEntry } from '@common/enums/entry.enum';
import { TransactionPriority } from '@common/enums/priority.enum';
import type { MonthEntry } from '@common/records/month-entry.record';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { getOptimalExpenseReductions } from '@frontend/features/budget-plan/utils/get-optimal-expense-reductions.util';
import { useBudgetPlanForm } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

const AutoRemoveThreshold = TransactionPriority.High;

interface UseBudgetPlanRecommendationsOptions {
  plannedRegularEntries: RegularEntry[];
  otherEntries: MonthEntry[];
  isEdit: boolean;
  onApply: () => void;
}

export function useBudgetPlanRecommendations({
  plannedRegularEntries,
  otherEntries,
  isEdit,
  onApply,
}: UseBudgetPlanRecommendationsOptions) {
  const { submit, state: submitState } = useBudgetPlanForm({ isEdit, onSuccess: onApply });

  const expenseEntries = useMemo<MonthEntry[]>(
    () => otherEntries.filter((e) => e.type === TypeEntry.Expense).sort((a, b) => a.priority - b.priority),
    [otherEntries],
  );

  const [selectedToKeep, setSelectedToKeep] = useState<Set<number>>(
    () => new Set(expenseEntries.filter((e) => e.priority >= AutoRemoveThreshold).map((e) => e.id)),
  );

  const toggleEntry = (id: number) => {
    setSelectedToKeep((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

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
    const toRemove = getOptimalExpenseReductions(expenseEntries, totalIncome, totalExpenses);
    setSelectedToKeep(new Set(expenseEntries.filter((e) => !toRemove.has(e.id)).map((e) => e.id)));
  };

  const buildOtherEntries = (filterByKeep: boolean) =>
    otherEntries
      .filter((e) => !filterByKeep || e.type !== TypeEntry.Expense || selectedToKeep.has(e.id))
      .map((e) => ({ ...e, id: e.id }));

  const apply = () => {
    submit({
      plannedRegularEntryIds: plannedRegularEntries.map((e) => e.id),
      otherEntries: buildOtherEntries(true),
    });
  };

  const skip = () => {
    submit({
      plannedRegularEntryIds: plannedRegularEntries.map((e) => e.id),
      otherEntries: buildOtherEntries(false),
    });
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
