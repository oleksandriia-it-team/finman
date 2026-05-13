'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import type { UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import type { RegularEntry } from '@common/records/regular-entry.record';
import {
  calculateBudgetPlanRecommendationSummary,
  normalizeBudgetPlanRecommendationEntries,
  sortBudgetPlanRecommendationEntries,
  toggleBudgetPlanRecommendationEntry,
} from '@frontend/features/budget-plan/utils/budget-plan-recommendations.util';
import { useBudgetPlanCurrentMonth } from '@frontend/features/budget-plan/hooks/use-budget-plan-current-month.hook';

export function useBudgetPlanRecommendations() {
  const router = useRouter();
  const showToast = useGlobalToast((state) => state.showToast);
  const { data: budgetPlan, status, error, isPending } = useBudgetPlanCurrentMonth('recommendations');
  const [draftEntries, setDraftEntries] = useState<UpdateBudgetPlanDto['otherEntries']>([]);

  useEffect(() => {
    if (budgetPlan?.otherEntries) {
      setDraftEntries(normalizeBudgetPlanRecommendationEntries(budgetPlan.otherEntries));
    }
  }, [budgetPlan]);

  const sortedDraftEntries = useMemo(() => sortBudgetPlanRecommendationEntries(draftEntries), [draftEntries]);

  const summary = useMemo(() => calculateBudgetPlanRecommendationSummary(draftEntries), [draftEntries]);

  const toggleEntrySelection = useCallback((entryId: number) => {
    setDraftEntries((prev) => toggleBudgetPlanRecommendationEntry(prev, entryId));
  }, []);

  const saveRecommendations = useCallback(async () => {
    if (!budgetPlan) {
      return;
    }

    try {
      await budgetPlanService.updateItem({
        plannedRegularEntryIds: budgetPlan.plannedRegularEntries.map((entry: RegularEntry) => entry.id),
        otherEntries: draftEntries,
      });

      showToast({
        title: 'Успіх',
        description: 'Рекомендації застосовані',
        variant: 'success',
      });
      router.push('/profile/budget/plans');
    } catch (err) {
      showToast({
        title: `Помилка: ${err instanceof Error ? err.message : 'Невідома помилка'}`,
        description: 'Не вдалось зберегти рекомендації',
        variant: 'destructive',
      });
    }
  }, [budgetPlan, draftEntries, router, showToast]);

  return {
    budgetPlan,
    status,
    error,
    isPending,
    draftEntries,
    sortedDraftEntries,
    summary,
    toggleEntrySelection,
    saveRecommendations,
  };
}
