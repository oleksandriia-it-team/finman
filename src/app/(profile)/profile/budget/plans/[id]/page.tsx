'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { getSafeAppError } from '@common/utils/get-safe-app-error.util';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { BudgetPlanScreen } from '@frontend/features/budget-plan/budget-plan-screen';

export default function BudgetPlanPage() {
  const router = useRouter();

  const { selectedBudgetPlanDate, lastLoadedBudgetPlan, state, error } = useSelectedBudgetPlan();

  const id = createBudgetPlanIdUrl(selectedBudgetPlanDate);

  useEffect(() => {
    if (state === PromiseState.Success && !lastLoadedBudgetPlan) {
      router.replace(`/profile/budget/plans/${id}/add`);
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

  if (!lastLoadedBudgetPlan) return null;

  return <BudgetPlanScreen budgetPlan={lastLoadedBudgetPlan} />;
}
