import { ErrorTexts } from '@common/constants/error-texts.constant';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';
import type { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';

export function ExistBudgetPlanGuard(budgetPlan: BudgetPlanOrm | null): ApiResultOperationError | null {
  if (!budgetPlan || !!budgetPlan.softDeleted) {
    return {
      status: 404,
      message: ErrorTexts.BudgetPlanNotFound,
    };
  }

  return null;
}
