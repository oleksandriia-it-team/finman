import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';

export function createBudgetPlanIdUrl(date: GetBudgetPlanDto): string {
  return `${String(date.month + 1).padStart(2, '0')}-${date.year}`;
}
