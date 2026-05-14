'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PromiseState } from 'src/client/shared/enums/promise-state.enum';
import { FinListScreenHandler } from 'src/client/shared/components/screen-handlers/fin-list-screen-handler';
import { FinLoader } from 'src/client/shared/components/loader/fin-loader';
import { useBudgetPlanCurrentMonth } from 'src/client/features/budget-plan/hooks/use-budget-plan-current-month.hook';
import { BudgetPlanEditForm } from 'src/client/features/budget-plan/budget-plan-edit-form/budget-plan-edit-form';
import BudgetPlanForm from '../budget-plan-form/budget-plan-form';

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
