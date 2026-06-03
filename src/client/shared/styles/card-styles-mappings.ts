'use client';

import { type AllCategories, ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import type { CategoryStyleI } from '@frontend/shared/models/category-styles.model';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export const IncomeCategoryValues = Object.values(IncomeCategories);
export const ExpenseCategoryValues = Object.values(ExpenseCategories);

type CategoryStyleBase = Omit<CategoryStyleI, 'label'>;

const CategoryStylesBase: Record<AllCategories, CategoryStyleBase> = {
  [ExpenseCategories.Groceries]: { variant: 'warning-muted', icon: 'basket' },
  [ExpenseCategories.Housing]: { variant: 'destructive-muted', icon: 'house' },
  [ExpenseCategories.Utilities]: { variant: 'aqua-muted', icon: 'plug' },
  [ExpenseCategories.Transport]: { variant: 'primary-muted', icon: 'bus-front' },
  [ExpenseCategories.Entertainment]: { variant: 'pink-muted', icon: 'film' },
  [ExpenseCategories.Education]: { variant: 'purple-muted', icon: 'book' },
  [ExpenseCategories.Shopping]: { variant: 'purple-muted', icon: 'bag-check' },
  [ExpenseCategories.Health]: { variant: 'teal-muted', icon: 'heart-pulse' },
  [ExpenseCategories.Misc]: { variant: 'muted', icon: 'three-dots' },
  [IncomeCategories.Salary]: { variant: 'success-muted', icon: 'cash-stack' },
  [IncomeCategories.Investments]: { variant: 'orange-muted', icon: 'graph-up' },
  [IncomeCategories.Freelance]: { variant: 'teal-muted', icon: 'laptop' },
  [IncomeCategories.Scholarship]: { variant: 'primary-muted', icon: 'mortarboard' },
  [IncomeCategories.Misc]: { variant: 'muted', icon: 'three-dots' },
};

export function useCategoriesMapping(): Record<AllCategories, CategoryStyleI> {
  const t = useTranslations('categories');
  return useMemo(
    () => ({
      [ExpenseCategories.Groceries]: { ...CategoryStylesBase[ExpenseCategories.Groceries], label: t('groceries') },
      [ExpenseCategories.Housing]: { ...CategoryStylesBase[ExpenseCategories.Housing], label: t('housing') },
      [ExpenseCategories.Utilities]: { ...CategoryStylesBase[ExpenseCategories.Utilities], label: t('utilities') },
      [ExpenseCategories.Transport]: { ...CategoryStylesBase[ExpenseCategories.Transport], label: t('transport') },
      [ExpenseCategories.Entertainment]: {
        ...CategoryStylesBase[ExpenseCategories.Entertainment],
        label: t('entertainment'),
      },
      [ExpenseCategories.Education]: { ...CategoryStylesBase[ExpenseCategories.Education], label: t('education') },
      [ExpenseCategories.Shopping]: { ...CategoryStylesBase[ExpenseCategories.Shopping], label: t('shopping') },
      [ExpenseCategories.Health]: { ...CategoryStylesBase[ExpenseCategories.Health], label: t('health') },
      [ExpenseCategories.Misc]: { ...CategoryStylesBase[ExpenseCategories.Misc], label: t('expense-misc') },
      [IncomeCategories.Salary]: { ...CategoryStylesBase[IncomeCategories.Salary], label: t('salary') },
      [IncomeCategories.Investments]: {
        ...CategoryStylesBase[IncomeCategories.Investments],
        label: t('investments'),
      },
      [IncomeCategories.Freelance]: { ...CategoryStylesBase[IncomeCategories.Freelance], label: t('freelance') },
      [IncomeCategories.Scholarship]: {
        ...CategoryStylesBase[IncomeCategories.Scholarship],
        label: t('scholarship'),
      },
      [IncomeCategories.Misc]: { ...CategoryStylesBase[IncomeCategories.Misc], label: t('income-misc') },
    }),
    [t],
  );
}

/** @deprecated Use `useCategoriesMapping()` for translated labels */
export const CategoriesMapping: Record<AllCategories, CategoryStyleI> = {
  [ExpenseCategories.Groceries]: { ...CategoryStylesBase[ExpenseCategories.Groceries], label: 'groceries' },
  [ExpenseCategories.Housing]: { ...CategoryStylesBase[ExpenseCategories.Housing], label: 'housing' },
  [ExpenseCategories.Utilities]: { ...CategoryStylesBase[ExpenseCategories.Utilities], label: 'utilities' },
  [ExpenseCategories.Transport]: { ...CategoryStylesBase[ExpenseCategories.Transport], label: 'transport' },
  [ExpenseCategories.Entertainment]: { ...CategoryStylesBase[ExpenseCategories.Entertainment], label: 'entertainment' },
  [ExpenseCategories.Education]: { ...CategoryStylesBase[ExpenseCategories.Education], label: 'education' },
  [ExpenseCategories.Shopping]: { ...CategoryStylesBase[ExpenseCategories.Shopping], label: 'shopping' },
  [ExpenseCategories.Health]: { ...CategoryStylesBase[ExpenseCategories.Health], label: 'health' },
  [ExpenseCategories.Misc]: { ...CategoryStylesBase[ExpenseCategories.Misc], label: 'expense-misc' },
  [IncomeCategories.Salary]: { ...CategoryStylesBase[IncomeCategories.Salary], label: 'salary' },
  [IncomeCategories.Investments]: { ...CategoryStylesBase[IncomeCategories.Investments], label: 'investments' },
  [IncomeCategories.Freelance]: { ...CategoryStylesBase[IncomeCategories.Freelance], label: 'freelance' },
  [IncomeCategories.Scholarship]: { ...CategoryStylesBase[IncomeCategories.Scholarship], label: 'scholarship' },
  [IncomeCategories.Misc]: { ...CategoryStylesBase[IncomeCategories.Misc], label: 'income-misc' },
};
