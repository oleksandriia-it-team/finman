'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { BudgetPlanFormScreen } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';

export default function CreateBudgetPlanPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { selectedBudgetPlanDate } = useSelectedBudgetPlan();

  const [state, setState] = useState<PromiseState>(PromiseState.Loading);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    setState(PromiseState.Loading);
    budgetPlanService
      .getItem({ month: selectedBudgetPlanDate.month, year: selectedBudgetPlanDate.year })
      .then((plan) => {
        if (plan) {
          router.replace(`/profile/budget/plans/${id}/edit`);
          return;
        }
        setState(PromiseState.Success);
      })
      .catch((err) => {
        setError(err);
        setState(PromiseState.Error);
      });
  }, [selectedBudgetPlanDate.month, selectedBudgetPlanDate.year]);

  if (state === PromiseState.Loading) return <FinLoader />;

  if (state === PromiseState.Error) {
    return (
      <FinErrorWidget
        message={getSafeErrorMessage(error)}
        status={400}
      />
    );
  }

  return (
    <BudgetPlanFormScreen
      onCancel={() => router.push(`/profile/budget/plans/${id}`)}
      onSuccess={() => router.push(`/profile/budget/plans/${id}`)}
    />
  );
}
