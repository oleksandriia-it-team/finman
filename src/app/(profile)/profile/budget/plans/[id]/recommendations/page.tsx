'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { BudgetPlanRecommendationsScreen } from '@frontend/features/budget-plan/budget-plan-recommendations-screen';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function BudgetPlanRecommendationsPage() {
  useHidePlusButton();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();
  const { plannedRegularEntries, monthOperations, resetDraft } = useBudgetPlanDraftStore();

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
    return (
      <FinErrorWidget
        message={getSafeErrorMessage(error)}
        status={400}
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
