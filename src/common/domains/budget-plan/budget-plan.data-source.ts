import type { BudgetPlanDetailed, BudgetPlanDto } from '@common/records/budget-plan.record';
import type { Month } from '@common/enums/month.enum';

export interface BudgetPlanDataSource {
  createItem(input: BudgetPlanDto): Promise<number>;
  updateItem(id: number, input: BudgetPlanDto): Promise<true>;
  getItem(month: Month, year: number): Promise<BudgetPlanDetailed | null>;
}
