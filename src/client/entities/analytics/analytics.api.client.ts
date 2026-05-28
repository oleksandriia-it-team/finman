import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import type { IAnalyticsRepository } from '@common/domains/analytics/analytics.repository.model';
import type {
  CategoryBreakdownFilter,
  MonthlyIncomeExpensesFilter,
  PlanVsActualFilter,
} from '@common/domains/analytics/analytics.schema';
import type {
  ExpensesByCategoryResponse,
  IncomesByCategoryResponse,
  MonthlyIncomeExpensesItem,
  PlanVsActualItem,
} from '@common/domains/analytics/analytics.model';

export class AnalyticsApiClient implements IAnalyticsRepository {
  async getMonthlyIncomeExpenses(input: MonthlyIncomeExpensesFilter): Promise<MonthlyIncomeExpensesItem[]> {
    return fetchClient
      .post<
        ApiResultOperationSuccess<MonthlyIncomeExpensesItem[]>
      >('/api/tracking-operation/analytics/monthly-income-expenses', input)
      .then((r) => r.data);
  }

  async getExpensesByCategory(input: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse> {
    return fetchClient
      .post<
        ApiResultOperationSuccess<ExpensesByCategoryResponse>
      >('/api/tracking-operation/analytics/expenses-by-category', input)
      .then((r) => r.data);
  }

  async getIncomesByCategory(input: CategoryBreakdownFilter): Promise<IncomesByCategoryResponse> {
    return fetchClient
      .post<
        ApiResultOperationSuccess<IncomesByCategoryResponse>
      >('/api/tracking-operation/analytics/incomes-by-category', input)
      .then((r) => r.data);
  }

  async getPlanVsActual(input: PlanVsActualFilter): Promise<PlanVsActualItem[]> {
    return fetchClient
      .post<ApiResultOperationSuccess<PlanVsActualItem[]>>('/api/budget/plan/analytics/plan-vs-actual', input)
      .then((r) => r.data);
  }
}

export const analyticsApiClient = new AnalyticsApiClient();
