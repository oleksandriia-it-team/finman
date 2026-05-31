import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { isEmpty } from '@common/utils/is-empty.util';

export function isCurrentMonth(a: GetBudgetPlanDto, b?: GetBudgetPlanDto): boolean {
  if (isEmpty(b)) {
    b = getCurrentMonthDate();
  }

  return a.month === b.month && a.year === b.year;
}
