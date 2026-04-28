import { CrudApiRepository } from '@backend/database/crud.api.repository';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';
import type { BudgetPlan } from '@common/records/budget-plan.record';

export class BudgetPlanRepository extends CrudApiRepository<BudgetPlanOrm, never, BudgetPlan> {}

export const budgetPlanRepository = new BudgetPlanRepository(BudgetPlanOrm);
