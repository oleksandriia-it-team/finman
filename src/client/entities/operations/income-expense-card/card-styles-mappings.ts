import { type AllCategories, ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';

interface CategoryStyleI {
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
  label: string;
}
export const IncomeCategoryValues = Object.values(IncomeCategories);
export const ExpenseCategoryValues = Object.values(ExpenseCategories);

export const CategoriesMapping: Record<AllCategories, CategoryStyleI> = {
  [ExpenseCategories.Groceries]: {
    borderColor: 'border-warning',
    textColor: 'var(--color-warning-muted-foreground)',
    bgColor: 'var(--color-warning-muted)',
    icon: 'basket',
    label: 'Продукти',
  },
  [ExpenseCategories.Housing]: {
    borderColor: 'border-destructive-foreground',
    textColor: 'var(--color-destructive-foreground)',
    bgColor: 'var(--color-destructive)',
    icon: 'house',
    label: 'Дім',
  },
  [ExpenseCategories.Utilities]: {
    borderColor: 'border-aqua',
    textColor: 'var(--color-aqua-muted-foreground)',
    bgColor: 'var(--color-aqua-muted)',
    icon: 'plug',
    label: 'Комунальні',
  },
  [ExpenseCategories.Transport]: {
    borderColor: 'border-primary',
    textColor: 'var(--color-primary)',
    bgColor: 'var(--color-accent)',
    icon: 'bus-front',
    label: 'Транспорт',
  },
  [ExpenseCategories.Entertainment]: {
    borderColor: 'border-pink',
    textColor: 'var(--color-pink-muted-foreground)',
    bgColor: 'var(--color-pink-muted)',
    icon: 'film',
    label: 'Розваги',
  },
  [ExpenseCategories.Education]: {
    borderColor: 'border-purple',
    textColor: 'var(--color-purple-muted-foreground)',
    bgColor: 'var(--color-purple-muted)',
    icon: 'book',
    label: 'Навчання',
  },
  [ExpenseCategories.Shopping]: {
    borderColor: 'border-purple',
    textColor: 'var(--color-purple-muted-foreground)',
    bgColor: 'var(--color-purple-muted)',
    icon: 'bag-check',
    label: 'Покупки',
  },
  [ExpenseCategories.Health]: {
    borderColor: 'border-teal',
    textColor: 'var(--color-teal-muted-foreground)',
    bgColor: 'var(--color-teal-muted)',
    icon: 'heart-pulse',
    label: 'Здоровʼя',
  },
  [ExpenseCategories.Misc]: {
    borderColor: 'border-muted',
    textColor: 'var(--color-muted-foreground)',
    bgColor: 'var(--color-secondary)',
    icon: 'three-dots',
    label: 'Інше',
  },

  // Доходи (Incomes)
  [IncomeCategories.Salary]: {
    borderColor: 'border-success',
    textColor: 'var(--color-success-muted-foreground)',
    bgColor: 'var(--color-success-muted)',
    icon: 'cash-stack',
    label: 'Зарплата',
  },
  [IncomeCategories.Investments]: {
    borderColor: 'border-orange',
    textColor: 'var(--color-orange-muted-foreground)',
    bgColor: 'var(--color-orange-muted)',
    icon: 'graph-up',
    label: 'Інвестиції',
  },
  [IncomeCategories.Freelance]: {
    borderColor: 'border-teal',
    textColor: 'var(--color-teal-muted-foreground)',
    bgColor: 'var(--color-teal-muted)',
    icon: 'laptop',
    label: 'Фріланс',
  },
  [IncomeCategories.Scholarship]: {
    borderColor: 'border-primary',
    textColor: 'var(--color-primary)',
    bgColor: 'var(--color-accent)',
    icon: 'mortarboard',
    label: 'Стипендія',
  },
  [IncomeCategories.Misc]: {
    borderColor: 'border-muted',
    textColor: 'var(--color-muted-foreground)',
    bgColor: 'var(--color-secondary)',
    icon: 'three-dots',
    label: 'Інше',
  },
};
