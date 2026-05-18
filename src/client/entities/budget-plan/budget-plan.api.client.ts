import type { IBudgetPlanRepository } from '@common/domains/budget-plan/budget-plan.repository.model';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import type { IBudgetPlanRepository } from '@common/domains/budget-plan/budget-plan.repository.model';

export class BudgetPlanApiClient implements IBudgetPlanRepository {
  createItem(input: CreateBudgetPlanDto): Promise<number> {
    return fetchClient
      .post<ApiResultOperationSuccess<number>>('/api/budget/plan/create-current-month', input)
      .then((r) => r.data);
  }

  getItem(input: GetBudgetPlanDto): Promise<BudgetPlanDetailed | null> {
    return fetchClient
      .post<ApiResultOperationSuccess<BudgetPlanDetailed | null>>('/api/budget/plan/get-plan', input)
      .then((r) => r.data);
  }

  updateItem(input: UpdateBudgetPlanDto): Promise<true> {
    return fetchClient
      .put<ApiResultOperationSuccess<true>>('/api/budget/plan/update-current-month', input)
      .then((r) => r.data);
  }
}

export const budgetPlanApiClient = new BudgetPlanApiClient();
