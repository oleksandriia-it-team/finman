'use client';

import { useMemo, useState } from 'react';
import { IncomesExpensesChartCard } from '@frontend/entities/analytics/incomes-expenses-chart/incomes-expenses-chart-card';
import { CategoriesExpensesChartCard } from '@frontend/entities/analytics/categories-charts/categories-expenses-chart/categories-expenses-chart-card';
import { CategoriesIncomesChartCard } from '@frontend/entities/analytics/categories-charts/categories-incomes-chart/categories-incomes-chart-card';
import {
  BudgetVsActualChartCard,
  type BudgetVsActualMode,
} from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart-card';
import {
  ExpenseCategoryValues,
  IncomeCategoryValues,
  useCategoriesMapping,
} from '@frontend/shared/styles/card-styles-mappings';
import { AnalyticsProvider, useAnalytics } from '@frontend/features/analytics/analytics.hook';
import { useAnalyticsQuery } from '@frontend/features/analytics/hooks/use-analytics-query.hook';
import { CategoriesFilterDropdown } from '@frontend/features/analytics/components/categories-filter-dropdown';
import { MonthPicker } from '@frontend/features/analytics/components/month-picker';
import { MonthRangePicker } from '@frontend/features/analytics/components/month-range-picker';
import { useAnalyticsEmptyActions } from '@frontend/features/analytics/analytics-empty-actions.hook';
import { getDefaultMonth, getDefaultRange } from '@common/domains/analytics/utils/get-default-filter.util';
import type { AllCategories } from '@common/enums/categories.enum';
import type { MonthRange, MonthYear } from '@common/domains/analytics/analytics.schema';
import type { PlanVsActualItem, PlanVsActualOperationItem } from '@common/domains/analytics/analytics.model';

const AllCategoriesList: AllCategories[] = [...ExpenseCategoryValues, ...IncomeCategoryValues];

function AnalyticsCards() {
  const {
    getMonthlyIncomeExpenses,
    getExpensesByCategory,
    getIncomesByCategory,
    getPlanVsActual,
    getPlanVsActualOperations,
  } = useAnalytics();
  const categoriesMapping = useCategoriesMapping();
  const emptyActions = useAnalyticsEmptyActions();

  const [incomesExpensesRange, setIncomesExpensesRange] = useState<MonthRange>(getDefaultRange);
  const [incomesExpensesCategories, setIncomesExpensesCategories] = useState<AllCategories[]>([]);
  const [expensesByCategoryRange, setExpensesByCategoryRange] = useState<MonthRange>(getDefaultRange);
  const [incomesByCategoryRange, setIncomesByCategoryRange] = useState<MonthRange>(getDefaultRange);
  const [planVsActualMonth, setPlanVsActualMonth] = useState<MonthYear>(getDefaultMonth);
  const [planVsActualMode, setPlanVsActualMode] = useState<BudgetVsActualMode>('category');

  const incomesExpensesFilter = useMemo(
    () => ({
      ...incomesExpensesRange,
      categories: incomesExpensesCategories.length > 0 ? incomesExpensesCategories : undefined,
    }),
    [incomesExpensesRange, incomesExpensesCategories],
  );

  const incomesExpenses = useAnalyticsQuery(
    'analytics-monthly-income-expenses',
    incomesExpensesFilter,
    getMonthlyIncomeExpenses,
    (data) =>
      data
        .filter((item) => item.income > 0 || item.expenses > 0)
        .map((item) => ({ month: item.month, incomes: item.income, expenses: item.expenses })),
    [],
  );

  const expensesByCategory = useAnalyticsQuery(
    'analytics-expenses-by-category',
    expensesByCategoryRange,
    getExpensesByCategory,
    (data) => data.items.filter((item) => item.sum > 0).map((item) => ({ category: item.category, amount: item.sum })),
    [],
  );

  const incomesByCategory = useAnalyticsQuery(
    'analytics-incomes-by-category',
    incomesByCategoryRange,
    getIncomesByCategory,
    (data) => data.items.filter((item) => item.sum > 0).map((item) => ({ category: item.category, amount: item.sum })),
    [],
  );

  const planVsActual = useAnalyticsQuery(
    'analytics-plan-vs-actual',
    { ...planVsActualMonth, mode: planVsActualMode },
    (filter): Promise<Array<PlanVsActualItem | PlanVsActualOperationItem>> =>
      filter.mode === 'operations' ? getPlanVsActualOperations(filter) : getPlanVsActual(filter),
    (data) =>
      data
        .filter((item) => item.planned > 0 || item.actual > 0)
        .map((item) => ({
          label: 'title' in item ? item.title : (categoriesMapping[item.category]?.label ?? String(item.category)),
          plan: item.planned,
          fact: item.actual,
        })),
    [],
  );

  return (
    <>
      <IncomesExpensesChartCard
        data={incomesExpenses.data}
        loading={incomesExpenses.isLoading}
        emptyAction={emptyActions.addOperation}
        filterTrigger={
          <div className="flex flex-col gap-2">
            <CategoriesFilterDropdown
              categories={AllCategoriesList}
              selected={incomesExpensesCategories}
              onChange={setIncomesExpensesCategories}
            />
            <MonthRangePicker
              value={incomesExpensesRange}
              onChange={setIncomesExpensesRange}
            />
          </div>
        }
      />
      <CategoriesExpensesChartCard
        data={expensesByCategory.data}
        loading={expensesByCategory.isLoading}
        emptyAction={emptyActions.addOperation}
        filterTrigger={
          <MonthRangePicker
            value={expensesByCategoryRange}
            onChange={setExpensesByCategoryRange}
          />
        }
      />
      <CategoriesIncomesChartCard
        data={incomesByCategory.data}
        loading={incomesByCategory.isLoading}
        emptyAction={emptyActions.addOperation}
        filterTrigger={
          <MonthRangePicker
            value={incomesByCategoryRange}
            onChange={setIncomesByCategoryRange}
          />
        }
      />
      <BudgetVsActualChartCard
        data={planVsActual.data}
        loading={planVsActual.isLoading}
        mode={planVsActualMode}
        onModeChange={setPlanVsActualMode}
        emptyAction={emptyActions.budgetPlans}
        filterTrigger={
          <MonthPicker
            value={planVsActualMonth}
            onChange={setPlanVsActualMonth}
          />
        }
      />
    </>
  );
}

export function AnalyticsScreen() {
  return (
    <AnalyticsProvider>
      <div className="size-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnalyticsCards />
      </div>
    </AnalyticsProvider>
  );
}
