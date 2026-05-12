'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan.service';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';

export function useBudgetPlanCurrentMonth(scope = 'current-month') {
  const currentDate = useMemo(() => getCurrentMonthDate(), []);

  return useQuery({
    queryKey: ['budget-plan', scope, currentDate.month, currentDate.year],
    queryFn: () => budgetPlanService.getItem(currentDate),
    staleTime: 0,
  });
}

export default useBudgetPlanCurrentMonth;
