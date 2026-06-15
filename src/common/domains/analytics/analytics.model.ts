import type { Month } from '@common/enums/month.enum';
import type { AllCategories, ExpenseCategory, IncomeCategory } from '@common/enums/categories.enum';

export interface MonthlyIncomeExpensesItem {
  month: Month;
  year: number;
  income: number;
  expenses: number;
}

export interface CategoryBreakdownItem<TCategory extends AllCategories = AllCategories> {
  category: TCategory;
  sum: number;
  percentage: number;
}

export interface CategoryBreakdownResponse<TCategory extends AllCategories = AllCategories> {
  total: number;
  items: CategoryBreakdownItem<TCategory>[];
}

export type ExpensesByCategoryResponse = CategoryBreakdownResponse<ExpenseCategory>;
export type IncomesByCategoryResponse = CategoryBreakdownResponse<IncomeCategory>;

export interface PlanVsActualItem {
  category: ExpenseCategory;
  planned: number;
  actual: number;
  overspend: boolean;
}

export interface PlanVsActualOperationItem {
  id: number;
  title: string;
  category: ExpenseCategory;
  planned: number;
  actual: number;
  overspend: boolean;
  source: 'month' | 'regular';
}
