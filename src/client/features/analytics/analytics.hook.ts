'use client';

import constate from 'constate';
import { analyticsService } from '@frontend/features/analytics/analytics.service';
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

function useAnalyticsLogic() {
  const getMonthlyIncomeExpenses = (filter: MonthlyIncomeExpensesFilter): Promise<MonthlyIncomeExpensesItem[]> => {
    return analyticsService.getMonthlyIncomeExpenses(filter);
  };

  const getExpensesByCategory = (filter: CategoryBreakdownFilter): Promise<ExpensesByCategoryResponse> => {
    return analyticsService.getExpensesByCategory(filter);
  };

  const getIncomesByCategory = (filter: CategoryBreakdownFilter): Promise<IncomesByCategoryResponse> => {
    return analyticsService.getIncomesByCategory(filter);
  };

  const getPlanVsActual = (filter: PlanVsActualFilter): Promise<PlanVsActualItem[]> => {
    return analyticsService.getPlanVsActual(filter);
  };

  const getPlanVsActualOperations = (filter: PlanVsActualFilter): Promise<PlanVsActualOperationItem[]> => {
    return analyticsService.getPlanVsActualOperations(filter);
  };

  return {
    getMonthlyIncomeExpenses,
    getExpensesByCategory,
    getIncomesByCategory,
    getPlanVsActual,
    getPlanVsActualOperations,
  };
}

export const [AnalyticsProvider, useAnalytics] = constate(useAnalyticsLogic);
