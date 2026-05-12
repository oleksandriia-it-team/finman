'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from 'src/client/widgets/profile-mobile-navbar/use-hide-plus-button';
import { useQuery } from '@tanstack/react-query';
import { budgetPlanService } from 'src/client/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from 'src/common/domains/budget-plan/get-current-month-date-util';
import BudgetPlanForm from 'src/client/features/budget-plan/budget-plan-form';
import { FinLoader } from 'src/client/shared/components/loader/fin-loader';
import { FinErrorWidget } from 'src/client/shared/components/error/fin-error-widget';

export default function EditBudgetPlanPage() {
  const router = useRouter();
  useHidePlusButton();

  const currentDate = getCurrentMonthDate();
  const {
    data: budgetPlan,
    status,
    error,
  } = useQuery({
    queryKey: ['budget-plan', currentDate.month, currentDate.year],
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
