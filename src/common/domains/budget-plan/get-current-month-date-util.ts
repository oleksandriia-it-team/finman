import type { Month } from '@common/enums/month.enum';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';

export function getCurrentMonthDate(): GetBudgetPlanModel {
  const now = new Date();
  return {
    month: now.getUTCMonth() as unknown as Month,
    year: now.getUTCFullYear(),
  };
}
