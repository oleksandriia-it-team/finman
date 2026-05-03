import { type AllCategories, ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import type { CategoryStyleI } from '@frontend/shared/models/category-styles.model';

export const IncomeCategoryValues = Object.values(IncomeCategories);
export const ExpenseCategoryValues = Object.values(ExpenseCategories);

export const CategoriesMapping: Record<AllCategories, CategoryStyleI> = {
  [ExpenseCategories.Groceries]: {
    variant: 'warning',
    icon: 'basket',
    label: 'Продукти',
  },
  [ExpenseCategories.Housing]: {
    variant: 'destructive',
    icon: 'house',
    label: 'Дім',
  },
  [ExpenseCategories.Utilities]: {
    variant: 'aqua',
    icon: 'plug',
    label: 'Комунальні',
  },
  [ExpenseCategories.Transport]: {
    variant: 'primary',
    icon: 'bus-front',
    label: 'Транспорт',
  },
  [ExpenseCategories.Entertainment]: {
    variant: 'pink',
    icon: 'film',
    label: 'Розваги',
  },
  [ExpenseCategories.Education]: {
    variant: 'purple',
    icon: 'book',
    label: 'Навчання',
  },
  [ExpenseCategories.Shopping]: {
    variant: 'purple',
    icon: 'bag-check',
    label: 'Покупки',
  },
  [ExpenseCategories.Health]: {
    variant: 'teal',
    icon: 'heart-pulse',
    label: 'Здоровʼя',
  },
  [ExpenseCategories.Misc]: {
    variant: 'muted',
    icon: 'three-dots',
    label: 'Інша витрата',
  },

  [IncomeCategories.Salary]: {
    variant: 'success',
    icon: 'cash-stack',
    label: 'Зарплата',
  },
  [IncomeCategories.Investments]: {
    variant: 'orange',
    icon: 'graph-up',
    label: 'Інвестиції',
  },
  [IncomeCategories.Freelance]: {
    variant: 'teal',
    icon: 'laptop',
    label: 'Фріланс',
  },
  [IncomeCategories.Scholarship]: {
    variant: 'primary',
    icon: 'mortarboard',
    label: 'Стипендія',
  },
  [IncomeCategories.Misc]: {
    variant: 'muted',
    icon: 'three-dots',
    label: 'Інше надходження',
  },
};
