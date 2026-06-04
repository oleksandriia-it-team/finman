import { AppError } from '@common/classes/app-error.class';
import { ErrorTexts } from '@common/constants/error-texts.constant';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import type { BudgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import type { PlannedRegOpsBudgetLocalRepository } from '@frontend/entities/planned-reg-ops-budget/planned-reg-ops-budget.local.repository';
import type { RegularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export async function deleteRegularEntryLocalUseCase(
  id: number,
  regularEntryRepository: RegularEntryLocalRepository,
  budgetPlanRepository: BudgetPlanLocalRepository,
  plannedRegOpsBudgetRepository: PlannedRegOpsBudgetLocalRepository,
): Promise<true> {
  const currentPlan = await budgetPlanRepository.getItem(getCurrentMonthDate());

  if (currentPlan?.id) {
    const isLinked = await plannedRegOpsBudgetRepository.existsByRegularOperationAndBudgetPlan(id, currentPlan.id);

    console.log(isLinked);

    if (isLinked) {
      throw new AppError(ErrorTexts.CannotDeleteRegularExistInCurrentBudgetPlan, 403);
    }
  }

  return regularEntryRepository.deleteItem(id);
}
