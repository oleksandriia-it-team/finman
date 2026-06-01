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
import { GetMonthlyIncomeExpensesLocalUseCase } from '@frontend/features/analytics/get-monthly-income-expenses.local.use-case';
import { GetExpensesByCategoryLocalUseCase } from '@frontend/features/analytics/get-expenses-by-category.local.use-case';
import { GetIncomesByCategoryLocalUseCase } from '@frontend/features/analytics/get-incomes-by-category.local.use-case';
import { GetPlanVsActualLocalUseCase } from '@frontend/features/analytics/get-plan-vs-actual.local.use-case';
import { trackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';
import { budgetPlanLocalRepository } from '@frontend/entities/budget-plan/budget-plan.local.repository';
import { monthEntryLocalRepository } from '@frontend/entities/month-entry/month-entry.local.repository';
import { plannedRegOpsBudgetLocalRepository } from '@frontend/entities/planned-reg-ops-budget/planned-reg-ops-budget.local.repository';
import { regularEntryLocalRepository } from '@frontend/entities/regular-entry/regular-entry.local.repository';

export class AnalyticsLocalUsecases implements IAnalyticsRepository {
  constructor(
    private readonly getMonthlyIncomeExpensesUseCase: GetMonthlyIncomeExpensesLocalUseCase,
    private readonly getExpensesByCategoryUseCase: GetExpensesByCategoryLocalUseCase,
    private readonly getIncomesByCategoryUseCase: GetIncomesByCategoryLocalUseCase,
    private readonly getPlanVsActualUseCase: GetPlanVsActualLocalUseCase,
  ) {}

  getMonthlyIncomeExpenses(input: MonthlyIncomeExpensesFilter): Promise<MonthlyIncomeExpensesItem[]> {
    return this.getMonthlyIncomeExpensesUseCase.execute(input);
  }

  getExpensesByCategory(input: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse> {
    return this.getExpensesByCategoryUseCase.execute(input);
  }

  getIncomesByCategory(input: CategoryBreakdownFilter): Promise<IncomesByCategoryResponse> {
    return this.getIncomesByCategoryUseCase.execute(input);
  }

  getPlanVsActual(input: PlanVsActualFilter): Promise<PlanVsActualItem[]> {
    return this.getPlanVsActualUseCase.execute(input);
  }
}

export const getMonthlyIncomeExpensesLocalUseCase = new GetMonthlyIncomeExpensesLocalUseCase(
  trackingOperationLocalRepository,
);

export const getExpensesByCategoryLocalUseCase = new GetExpensesByCategoryLocalUseCase(
  trackingOperationLocalRepository,
);

export const getIncomesByCategoryLocalUseCase = new GetIncomesByCategoryLocalUseCase(trackingOperationLocalRepository);

export const getPlanVsActualLocalUseCase = new GetPlanVsActualLocalUseCase(
  trackingOperationLocalRepository,
  budgetPlanLocalRepository,
  monthEntryLocalRepository,
  plannedRegOpsBudgetLocalRepository,
  regularEntryLocalRepository,
);

export const analyticsLocalUsecases = new AnalyticsLocalUsecases(
  getMonthlyIncomeExpensesLocalUseCase,
  getExpensesByCategoryLocalUseCase,
  getIncomesByCategoryLocalUseCase,
  getPlanVsActualLocalUseCase,
);
