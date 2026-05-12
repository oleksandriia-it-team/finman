'use client';

import { useRouter } from 'next/navigation';
import BudgetPlanForm from '@frontend/features/budget-plan/budget-plan-form';

export function BudgetPlanCreateScreen() {
  const router = useRouter();

  return (
    <div className="flex size-full">
      <BudgetPlanForm
        onCancel={() => router.push('/profile/budget/plans')}
        onSuccess={() => router.push('/profile/budget/plans/recommendations')}
      />
    </div>
  );
}
