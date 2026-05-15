// src/client/features/budget-plan/hooks/use-budget-plan-by-date.hook.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { budgetPlanService } from 'src/client/features/budget-plan/budget-plan-service/budget-plan.service';
import type { GetBudgetPlanDto } from 'src/common/domains/budget-plan/get-budget-plan.schema';

export function useBudgetPlanByDate(date: GetBudgetPlanDto, scope = 'view') {
  return useQuery({
    queryKey: ['budget-plan', scope, date.month, date.year],
    queryFn: () => budgetPlanService.getItem(date),
    staleTime: 0,
  });
}
