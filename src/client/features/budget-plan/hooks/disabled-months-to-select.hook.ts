import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useMemo } from 'react';
import { Month } from '@common/enums/month.enum';

export function useDisabledMonthsToSelect() {
  const { now, selectedBudgetPlanDate } = useSelectedBudgetPlan();

  return useMemo(() => {
    if (now.year > selectedBudgetPlanDate.year) {
      return Object.values(Month);
    }

    if (now.year < selectedBudgetPlanDate.year) {
      return [];
    }

    return Object.values(Month).filter((month) => month > now.month);
  }, [now.month, now.year, selectedBudgetPlanDate.year]);
}
