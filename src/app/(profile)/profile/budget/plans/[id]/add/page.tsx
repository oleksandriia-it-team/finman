'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { BudgetPlanFormScreen } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function CreateBudgetPlanPage() {
  useHidePlusButton();
  const router = useRouter();

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();
  const id = createBudgetPlanIdUrl(selectedBudgetPlanDate);

  useEffect(() => {
    if (state === PromiseState.Success && lastLoadedBudgetPlan) {
      router.replace(`/profile/budget/plans/${id}/edit`);
    }
  }, [state, lastLoadedBudgetPlan, id, router]);

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

  if (lastLoadedBudgetPlan) return null;

  return (
    <BudgetPlanFormScreen
      onCancel={() => router.push(`/profile/budget/plans/${id}`)}
      onSuccess={() => router.push(`/profile/budget/plans/${id}/recommendations`)}
    />
  );
}
