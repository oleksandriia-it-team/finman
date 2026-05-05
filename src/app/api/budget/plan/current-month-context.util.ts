import type { BudgetPlanContext } from './current-month-context.model';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { budgetPlanRepository } from '@backend/entities/budget-plan/infrastructure/budget-plan.repository';
import { isEmpty } from '@common/utils/is-empty.util';

export async function getCurrentMonthBudgetPlanContext(request: Request): Promise<BudgetPlanContext> {
  const userId = await GetUserIdTransformer(request);

  const date = getCurrentMonthDate();

  if (isEmpty(userId)) {
    return {
      ...date,
      userId,
      budgetPlan: null,
    };
  }

  const budgetPlan = await budgetPlanRepository.getItem({ ...date, userId });

  return {
    ...date,
    userId,
    budgetPlan,
  };
}
