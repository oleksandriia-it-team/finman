import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { CreateBudgetPlanModel, UpdateBudgetPlanModel } from './budget-plan.schema';

export interface IBudgetPlanRepository {
  createItem(input: CreateBudgetPlanModel): Promise<number>;
  updateItem(input: UpdateBudgetPlanModel): Promise<true>;
  getItem(input: GetBudgetPlanModel): Promise<BudgetPlanDetailed | null>;
}
