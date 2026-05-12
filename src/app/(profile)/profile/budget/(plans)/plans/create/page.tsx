'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from 'src/client/widgets/profile-mobile-navbar/use-hide-plus-button';
import BudgetPlanForm from 'src/client/features/budget-plan/budget-plan-form';

export default function CreateBudgetPlanPage() {
  const router = useRouter();
  useHidePlusButton();

  return (
    <div className="flex size-full">
      <BudgetPlanForm
        onCancel={() => router.push('/profile/budget/plans')}
        onSuccess={() => router.push('/profile/budget/plans/recommendations')}
      />
    </div>
  );
}
