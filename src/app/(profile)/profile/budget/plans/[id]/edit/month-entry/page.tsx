'use client';

import { useRouter } from 'next/navigation';
import type { MonthEntry } from '@common/records/month-entry.record';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { MonthEntryForm } from '@frontend/features/budget-plan/budget-plan-form/month-entry-form/month-entry-form';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function EditMonthEntryPage() {
  useHidePlusButton();
  const router = useRouter();

  const { selectedBudgetPlanDate } = useSelectedBudgetPlan();
  const { addMonthOperation } = useBudgetPlanDraftStore();

  const planUrl = `/profile/budget/plans/${createBudgetPlanIdUrl(selectedBudgetPlanDate)}/edit`;

  const handleSuccess = (data: MonthEntry) => {
    addMonthOperation(data);
    router.push(planUrl);
  };

  return (
    <MonthEntryForm
      onSuccess={handleSuccess}
      onCancel={() => router.push(planUrl)}
    />
  );
}
