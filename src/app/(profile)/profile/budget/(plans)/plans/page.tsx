// src/app/(profile)/profile/budget/(plans)/plans/page.tsx
'use client';

import { useMemo } from 'react';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { BudgetPlanListScreen } from '@frontend/features/budget-plan/budget-plan-form/budget-plan-list-screen';

export default function BudgetPlansPage() {
  const currentDate = useMemo(() => getCurrentMonthDate(), []);
  return <BudgetPlanListScreen date={currentDate} />;
}
