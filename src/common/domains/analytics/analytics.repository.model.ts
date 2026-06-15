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
  PlanVsActualOperationItem,
} from '@common/domains/analytics/analytics.model';

export interface IAnalyticsRepository {
  getMonthlyIncomeExpenses(input: MonthlyIncomeExpensesFilter): Promise<MonthlyIncomeExpensesItem[]>;
  getExpensesByCategory(input: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse>;
  getIncomesByCategory(input: CategoryBreakdownFilter): Promise<IncomesByCategoryResponse>;
  getPlanVsActual(input: PlanVsActualFilter): Promise<PlanVsActualItem[]>;
  getPlanVsActualOperations(input: PlanVsActualFilter): Promise<PlanVsActualOperationItem[]>;
}
