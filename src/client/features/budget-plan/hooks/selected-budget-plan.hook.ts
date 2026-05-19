import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { useMemo, useState } from 'react';
import constate from 'constate';
import { useQuery } from '@tanstack/react-query';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

function useSelectedBudgetPlanLogic() {
  const [selectedBudgetPlanDate, setBudgetPlanDate] = useState<GetBudgetPlanDto>(getCurrentMonthDate());

  const budgetPlanQuery = useQuery({
    queryKey: ['budget-plan', createBudgetPlanIdUrl(selectedBudgetPlanDate)],
    queryFn: () => budgetPlanService.getItem(selectedBudgetPlanDate),
  });

  return useMemo(
    () => ({
      selectedBudgetPlanDate,
      setBudgetPlanDate,
      lastLoadedBudgetPlan: budgetPlanQuery.data,
      state: getPromiseState(budgetPlanQuery.status),
      error: budgetPlanQuery.error,
    }),
    [budgetPlanQuery.data, budgetPlanQuery.error, budgetPlanQuery.status, selectedBudgetPlanDate],
  );
}

export const [SelectedBudgetPlanProvider, useSelectedBudgetPlan] = constate(useSelectedBudgetPlanLogic);
