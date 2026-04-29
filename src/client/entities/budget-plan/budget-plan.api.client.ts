import type {
  IBudgetPlanRepository,
  UpdateBudgetPlanModel,
} from '@common/domains/budget-plan/budget-plan.repository.model';
import type { BudgetPlanDetailed, BudgetPlanDto } from '@common/records/budget-plan.record';
import type { GetBudgetPlanModel } from '@common/domains/budget-plan/get-budget-plan.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';

export class BudgetPlanApiClient implements IBudgetPlanRepository {
  createItem(input: BudgetPlanDto): Promise<number> {
    return fetchClient
      .post<ApiResultOperationSuccess<number>>('/api/budget/plan/create-current-month', input)
      .then((r) => r.data);
  }

  getItem(input: GetBudgetPlanModel): Promise<BudgetPlanDetailed | null> {
    return fetchClient
      .post<ApiResultOperationSuccess<BudgetPlanDetailed | null>>('/api/budget/plan/get-plan', input)
      .then((r) => r.data);
  }

  updateItem(input: UpdateBudgetPlanModel): Promise<true> {
    return fetchClient
      .post<ApiResultOperationSuccess<true>>('/api/budget/plan/update-current-month', input)
      .then((r) => r.data);
  }
}

export const budgetPlanApiClient = new BudgetPlanApiClient();
