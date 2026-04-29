import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { Month } from '@common/enums/month.enum';

export interface BudgetPlanContext {
  userId: number | null;
  budgetPlan: BudgetPlanOrm | null;
  month: Month;
  year: number;
}
