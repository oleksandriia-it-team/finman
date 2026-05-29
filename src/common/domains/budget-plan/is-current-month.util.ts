import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';

export function isCurrentMonth(date: GetBudgetPlanDto): boolean {
  const now = getCurrentMonthDate();
  return now.month === date.month && now.year === date.year;
}
