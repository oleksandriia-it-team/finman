import { ExpenseCategories } from '@common/enums/categories.enum';
import { Month } from '@common/enums/month.enum';
import type { IncomeExpenseDataItem } from '@frontend/entities/analytics/incomes-expenses-chart/props/incomes-expenses-chart.props';
import type { CategoryDataItem } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';
import { CategoriesExpensesChartCard } from '@frontend/entities/analytics/categories-charts/categories-expenses-chart/categories-expenses-chart-card';
import { IncomesExpensesChartCard } from '@frontend/entities/analytics/incomes-expenses-chart/incomes-expenses-chart-card';
import { IncomeCategories } from '@common/enums/categories.enum';
import { CategoriesIncomesChartCard } from '@frontend/entities/analytics/categories-charts/categories-incomes-chart/categories-incomes-card';
import { BudgetVsActualChartCard } from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart-card';
import type { BudgetItem } from '@frontend/entities/analytics/budget-vs-actual-chart/props/budget-vs-actual-props';

const incomesExpensesMockData: IncomeExpenseDataItem[] = [
  { month: Month.January, incomes: 186, expenses: 80 },
  { month: Month.February, incomes: 305, expenses: 200 },
  { month: Month.March, incomes: 237, expenses: 120 },
  { month: Month.April, incomes: 73, expenses: 190 },
  { month: Month.May, incomes: 209, expenses: 290 },
  { month: Month.June, incomes: 214, expenses: 130 },
];

const categoriesExpensesMockData: CategoryDataItem[] = [
  { category: ExpenseCategories.Groceries, amount: 4200 },
  { category: ExpenseCategories.Housing, amount: 8500 },
  { category: ExpenseCategories.Utilities, amount: 2100 },
  { category: ExpenseCategories.Transport, amount: 1800 },
  { category: ExpenseCategories.Entertainment, amount: 1200 },
  { category: ExpenseCategories.Education, amount: 950 },
  { category: ExpenseCategories.Shopping, amount: 3100 },
  { category: ExpenseCategories.Health, amount: 1400 },
  { category: ExpenseCategories.Misc, amount: 600 },
];

const categoriesIncomesMockData: CategoryDataItem[] = [
  { category: IncomeCategories.Salary, amount: 35000 },
  { category: IncomeCategories.Freelance, amount: 12000 },
  { category: IncomeCategories.Investments, amount: 5400 },
  { category: IncomeCategories.Scholarship, amount: 2000 },
  { category: IncomeCategories.Misc, amount: 800 },
];

const budgetVsActualMockData: BudgetItem[] = [
  { label: 'Продукти', plan: 7000, fact: 8200 },
  { label: 'Транспорт', plan: 5000, fact: 4500 },
  { label: 'Розваги', plan: 3500, fact: 3200 },
  { label: 'Комуналка', plan: 4500, fact: 3800 },
  { label: "Здоров'я", plan: 2000, fact: 2400 },
  { label: 'Освіта', plan: 2500, fact: 1900 },
  { label: 'Інше', plan: 2000, fact: 1520 },
];

export function AnalyticsScreen() {
  return (
    <div className="size-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
      <IncomesExpensesChartCard data={incomesExpensesMockData} />
      <CategoriesExpensesChartCard data={categoriesExpensesMockData} />
      <CategoriesIncomesChartCard data={categoriesIncomesMockData} />
      <BudgetVsActualChartCard data={budgetVsActualMockData} />
    </div>
  );
}
