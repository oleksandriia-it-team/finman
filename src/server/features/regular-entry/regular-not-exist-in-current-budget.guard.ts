import { plannedRegOpsBudgetRepository } from '@backend/entities/planned-reg-ops-budget/infrastructure/planned-reg-ops-budget.repository';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { ErrorTexts } from '@common/constants/error-texts.constant';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

export async function RegularNotExistInCurrentBudgetGuard(id: number): Promise<ApiResultOperationError | null> {
  const exist = await plannedRegOpsBudgetRepository.repository.findOne({
    where: { regularOperationId: id, budgetPlan: { ...getCurrentMonthDate() } },
  });

  if (exist) {
    return {
      status: 403,
      message: ErrorTexts.CannotDeleteRegularExistInCurrentBudgetPlan,
    };
  }

  return null;
}
