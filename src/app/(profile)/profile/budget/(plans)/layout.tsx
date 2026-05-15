'use client';

import { useMemo } from 'react';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';

export default function BudgetPlansLayout({ children }: ChildrenComponentProps) {
  const currentDate = useMemo(() => getCurrentMonthDate(), []);
  const dateId = `${String(currentDate.month + 1).padStart(2, '0')}-${currentDate.year}`;

  useSetCenterButton(`/profile/budget/plans/edit/${dateId}`);

  return children;
}
