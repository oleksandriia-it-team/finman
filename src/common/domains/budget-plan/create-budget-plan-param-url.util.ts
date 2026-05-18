import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';

export function createBudgetPlanIdUrl(date: GetBudgetPlanDto): string {
  return `${date.month + 1}-${date.year}`;
}
