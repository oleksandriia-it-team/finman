import type { BudgetPlanDetailed, BudgetPlanDto } from '@common/records/budget-plan.record';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';

export interface IBudgetPlanRepository {
  createItem(input: Omit<BudgetPlanDto, keyof GetBudgetPlanModel> & Partial<GetBudgetPlanModel>): Promise<number>;
  updateItem(input: UpdateBudgetPlanModel): Promise<true>;
  getItem(input: GetBudgetPlanModel): Promise<BudgetPlanDetailed | null>;
}

export type UpdateBudgetPlanModel = BudgetPlanDto & { id: number };
