import type {
  RegularExpensesCardCategories,
  RegularIncomesCardCategories,
} from '@frontend/entities/budget-plan/income-expense-card/card-categories';

interface CategoryStyleI {
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: string;
  label: string;
}

export const IncomeCategoryKeys: (keyof typeof CategoriesMapping)[] = [
  'salary',
  'investments',
  'freelance',
  'scholarship',
];

export const ExpenseCategoryKeys: (keyof typeof CategoriesMapping)[] = [
  'groceries',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'education',
  'shopping',
  'health',
];

export type AllCategories = RegularIncomesCardCategories | RegularExpensesCardCategories;

export const CategoriesMapping: Record<AllCategories, CategoryStyleI> = {
  groceries: {
    borderColor: 'border-warning',
    textColor: 'var(--color-warning-muted-foreground)',
    bgColor: 'var(--color-warning-muted)',
    icon: 'basket',
    label: 'Продукти',
  },
  housing: {
    borderColor: 'border-destructive-foreground',
    textColor: 'var(--color-destructive-foreground)',
    bgColor: 'var(--color-destructive)',
    icon: 'house',
    label: 'Дім',
  },
  utilities: {
    borderColor: 'border-aqua',
    textColor: 'var(--color-aqua-muted-foreground)',
    bgColor: 'var(--color-aqua-muted)',
    icon: 'plug',
    label: 'Комунальні',
  },
  transport: {
    borderColor: 'border-primary',
    textColor: 'var(--color-primary)',
    bgColor: 'var(--color-accent)',
    icon: 'bus-front',
    label: 'Транспорт',
  },
  entertainment: {
    borderColor: 'border-pink',
    textColor: 'var(--color-pink-muted-foreground)',
    bgColor: 'var(--color-pink-muted)',
    icon: 'film',
    label: 'Розваги',
  },
  education: {
    borderColor: 'border-purple',
    textColor: 'var(--color-purple-muted-foreground)',
    bgColor: 'var(--color-purple-muted)',
    icon: 'book',
    label: 'Навчання',
  },
  shopping: {
    borderColor: 'border-purple',
    textColor: 'var(--color-purple-muted-foreground)',
    bgColor: 'var(--color-purple-muted)',
    icon: 'bag-check',
    label: 'Покупки',
  },
  health: {
    borderColor: 'border-teal',
    textColor: 'var(--color-teal-muted-foreground)',
    bgColor: 'var(--color-teal-muted)',
    icon: 'heart-pulse',
    label: 'Здоровʼя',
  },
  misc: {
    borderColor: 'border-muted',
    textColor: 'var(--color-muted-foreground)',
    bgColor: 'var(--color-secondary)',
    icon: 'three-dots',
    label: 'Інше',
  },
  salary: {
    borderColor: 'border-success',
    textColor: 'var(--color-success-muted-foreground)',
    bgColor: 'var(--color-success-muted)',
    icon: 'cash-stack',
    label: 'Зарплата',
  },
  investments: {
    borderColor: 'border-orange',
    textColor: 'var(--color-orange-muted-foreground)',
    bgColor: 'var(--color-orange-muted)',
    icon: 'graph-up',
    label: 'Інвестиції',
  },
  freelance: {
    borderColor: 'border-teal',
    textColor: 'var(--color-teal-muted-foreground)',
    bgColor: 'var(--color-teal-muted)',
    icon: 'laptop',
    label: 'Фріланс',
  },
  scholarship: {
    borderColor: 'border-primary',
    textColor: 'var(--color-primary)',
    bgColor: 'var(--color-accent)',
    icon: 'mortarboard',
    label: 'Стипендія',
  },
};
