'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import BudgetPlanForm from '@frontend/features/budget-plan/budget-plan-form';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';

export function BudgetPlanEditScreen() {
  const router = useRouter();
  const currentDate = useMemo(() => getCurrentMonthDate(), []);
  const {
    data: budgetPlan,
    status,
    error,
  } = useQuery({
    queryKey: ['budget-plan', 'edit', currentDate.month, currentDate.year],
    queryFn: () => budgetPlanService.getItem(currentDate),
    staleTime: 0,
  });

  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center h-full">
        <FinLoader />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <FinErrorWidget
        status={500}
        message={error instanceof Error ? error.message : 'Помилка завантаження'}
      />
    );
  }

  if (!budgetPlan) {
    return (
      <FinErrorWidget
        status={404}
        message="Бюджетний план не знайдено"
      />
    );
  }

  return (
    <div className="flex size-full">
      <BudgetPlanForm
        initialData={budgetPlan}
        onCancel={() => router.push('/profile/budget/plans')}
        onSuccess={() => router.push('/profile/budget/plans/recommendations')}
      />
    </div>
  );
}

export default BudgetPlanEditScreen;
