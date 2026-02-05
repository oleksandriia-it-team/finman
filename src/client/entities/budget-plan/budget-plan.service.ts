import { budgetPlanLocalRepository } from '../../local-repositories/budget-plan/budget-plan.local.repository';
import { BasicDataSource } from '../../database/data-source/basic.data-source';

export const budgetPlanService = new BasicDataSource(budgetPlanLocalRepository);
