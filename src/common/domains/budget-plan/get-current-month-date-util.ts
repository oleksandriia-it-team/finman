import type { Month } from '@common/enums/month.enum';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';

export function getCurrentMonthDate(): GetBudgetPlanModel {
  return {
    month: new Date().getUTCMonth() as unknown as Month,
    year: new Date().getUTCFullYear(),
  };
}
