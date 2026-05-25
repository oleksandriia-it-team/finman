'use client';

import { useRouter } from 'next/navigation';
import type { MonthEntry } from '@common/records/month-entry.record';
import { useBudgetPlanDraftStore } from '@frontend/features/budget-plan/hooks/budget-plan-draft';
import { MonthEntryForm } from '@frontend/features/budget-plan/budget-plan-form/month-entry-form/month-entry-form';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function AddMonthEntryPage() {
  useHidePlusButton();
  const router = useRouter();

  const { addMonthOperation } = useBudgetPlanDraftStore();

  const handleSuccess = (data: MonthEntry) => {
    addMonthOperation(data);
    router.back();
  };

  return (
    <MonthEntryForm
      onSuccess={handleSuccess}
      onCancel={() => router.back()}
    />
  );
}
