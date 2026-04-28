import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import { type Month } from '@common/enums/month.enum';
import type { BudgetPlanDataSource } from '@common/domains/budget-plan/budget-plan.data-source';

export class BudgetPlanRepository
  extends CrudApiRepository<BudgetPlanOrm, never, BudgetPlanDto>
  implements BudgetPlanDataSource
{
  async getItem(month: Month, year: number, userId?: number) {
    if (userId) {
      return this.repository.findOne({ where: { month, year, userId } });
    }
    return this.repository.findOne({ where: { month, year } });
  }
}

export const budgetPlanRepository = new BudgetPlanRepository(BudgetPlanOrm);
