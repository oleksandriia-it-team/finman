import { ErrorTexts } from '@common/constants/error-texts.constant';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';

export function NotExistBudgetPlanGuard(budgetPlan: BudgetPlanOrm | null): ApiResultOperationError | null {
  if (budgetPlan && !budgetPlan.softDeleted) {
    return {
      status: 409,
      message: ErrorTexts.BudgetPlanAlreadyExists,
    };
  }

  return null;
}
