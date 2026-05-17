import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from './budget-plan.schema';

export interface IBudgetPlanRepository {
  createItem(input: CreateBudgetPlanDto): Promise<number>;
  updateItem(input: UpdateBudgetPlanDto): Promise<void>;
  getItem(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null>;
}
