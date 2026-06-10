import { useSelectedBudgetPlan } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';
import { useMemo } from 'react';
import { Month } from '@common/enums/month.enum';

export function useDisabledMonthsToSelect(year: number) {
  const { now } = useSelectedBudgetPlan();

  return useMemo(() => {
    if (now.year > year) {
      return [];
    }

    if (now.year < year) {
      return Object.values(Month);
    }

    return Object.values(Month).filter((month) => month > now.month);
  }, [now.month, now.year, year]);
}
