'use client';

import { BudgetPlanFormScreen } from '@frontend/features/budget-plan/budget-plan-form/create-budget-plan/budget-plan-create-screen';
import { useParams, useRouter } from 'next/navigation';

export default function CreateBudgetPlanPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  return (
    <BudgetPlanFormScreen
      onCancel={() => router.push(`/profile/budget/plans/${id}`)}
      onSuccess={() => router.push(`/profile/budget/plans/${id}`)}
    />
  );
}
