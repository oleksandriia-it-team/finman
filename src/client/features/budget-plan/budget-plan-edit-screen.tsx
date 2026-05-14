'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { useBudgetPlanCurrentMonth } from '@frontend/features/budget-plan/hooks/use-budget-plan-current-month.hook';
import { BudgetPlanEditForm } from '@frontend/features/budget-plan/budget-plan-edit-form';
import BudgetPlanForm from '@frontend/features/budget-plan/budget-plan-form';

function BudgetPlanEditScreenSkeleton() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <FinLoader />
    </div>
  );
}

export function BudgetPlanEditScreen() {
  const router = useRouter();
  const { data: budgetPlan, status, error } = useBudgetPlanCurrentMonth('edit');

  const state = useMemo(() => {
    if (status === 'pending') return PromiseState.Loading;
    if (status === 'error') return PromiseState.Error;
    return PromiseState.Success;
  }, [status]);

  return (
    <div className="flex size-full">
      <FinListScreenHandler
        state={state}
        errorMessage={error instanceof Error ? error.message : 'Помилка завантаження'}
        hasData
        skeletonItems={1}
        skeleton={BudgetPlanEditScreenSkeleton}
      >
        {budgetPlan ? (
          <BudgetPlanEditForm
            initialData={budgetPlan}
            onCancel={() => router.push('/profile/budget/plans')}
            onSuccess={() => router.push('/profile/budget/plans')}
          />
        ) : (
          <BudgetPlanForm
            onCancel={() => router.push('/profile/budget/plans')}
            onSuccess={() => router.push('/profile/budget/plans')}
          />
        )}
      </FinListScreenHandler>
    </div>
  );
}

export default BudgetPlanEditScreen;
