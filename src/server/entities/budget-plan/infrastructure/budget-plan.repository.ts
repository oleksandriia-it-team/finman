import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { BudgetPlanDto } from '@common/records/budget-plan.record';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';

export type GetApiBudgetPlanInput = GetBudgetPlanDto & { userId: number };

export class BudgetPlanRepository extends CrudApiRepository<BudgetPlanOrm, never, BudgetPlanDto> {
  async getItem({ month, year, userId }: GetApiBudgetPlanInput) {
    return this.repository.findOne({
      where: { month, year, userId },
      relations: {
        plannedRegularEntries: true,
        otherEntries: true,
      },
    });
  }
}

export const budgetPlanRepository = new BudgetPlanRepository(BudgetPlanOrm);
