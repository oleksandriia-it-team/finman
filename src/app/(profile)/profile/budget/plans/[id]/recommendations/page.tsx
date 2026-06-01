'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { BudgetPlanRecommendationsScreen } from '@frontend/features/budget-plan/budget-plan-recommendations-screen';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function BudgetPlanRecommendationsPage() {
  useHidePlusButton();
  const router = useRouter();

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();
  const { plannedRegularEntries, monthOperations, resetDraft } = useBudgetPlanDraftStore();

  const id = createBudgetPlanIdUrl(selectedBudgetPlanDate);

  const isEdit = !!lastLoadedBudgetPlan;
  const [needsRedirect] = useState(() => plannedRegularEntries.length === 0);

  useEffect(() => {
    if (!needsRedirect) return;
    if (state !== PromiseState.Success) return;
    router.replace(`/profile/budget/plans/${id}/${isEdit ? 'edit' : 'add'}`);
  }, [needsRedirect, state, isEdit, id, router]);

  const handleApply = () => {
    router.push(`/profile/budget/plans/${id}`);
    resetDraft();
  };

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error) {
    const appError = getSafeAppError(error);
    return (
      <FinErrorWidget
        message={appError.message}
        status={appError.status}
      />
    );
  }

  if (needsRedirect) return null;

  return (
    <BudgetPlanRecommendationsScreen
      month={selectedBudgetPlanDate.month}
      year={selectedBudgetPlanDate.year}
      plannedRegularEntries={plannedRegularEntries}
      otherEntries={monthOperations}
      isEdit={isEdit}
      onApply={handleApply}
    />
  );
}
