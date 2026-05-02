import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';

export type GetApiBudgetPlanInput = GetBudgetPlanModel & { userId: number };

export class BudgetPlanRepository extends CrudApiRepository<BudgetPlanOrm, never, BudgetPlanDto> {
  async getItem({ month, year, userId }: GetApiBudgetPlanInput) {
    if (userId) {
      return this.repository.findOne({
        where: { month, year, userId },
        relations: {
          plannedRegularEntries: true,
          otherEntries: true,
        },
      });
    }
    return this.repository.findOne({ where: { month, year } });
  }
}

export const budgetPlanRepository = new BudgetPlanRepository(BudgetPlanOrm);
