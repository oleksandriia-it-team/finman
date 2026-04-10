import {
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

export type AllCategories = RegularIncomesCardCategories | RegularExpensesCardCategories;

export const CategoriesMapping: Record<AllCategories, CategoryStyleI> = {
  groceries: {
    borderColor: 'border-warning',
    textColor: 'text-warning-muted-foreground',
    bgColor: 'bg-warning-muted',
    icon: 'basket',
    label: 'Продукти',
  },
  housing: {
    borderColor: 'border-destructive-foreground',
    textColor: 'text-destructive-foreground',
    bgColor: 'bg-destructive',
    icon: 'house',
    label: 'Дім',
  },
  utilities: {
    borderColor: 'border-aqua',
    textColor: 'text-aqua-muted-foreground',
    bgColor: 'bg-aqua-muted',
    icon: 'plug',
    label: 'Комунальні',
  },
  transport: {
    borderColor: 'border-primary',
    textColor: 'text-primary',
    bgColor: 'bg-accent',
    icon: 'bus-front',
    label: 'Транспорт',
  },
  entertainment: {
    borderColor: 'border-pink',
    textColor: 'text-pink-muted-foreground',
    bgColor: 'bg-pink-muted',
    icon: 'film',
    label: 'Розваги',
  },
  education: {
    borderColor: 'border-purple',
    textColor: 'text-purple-muted-foreground',
    bgColor: 'bg-purple-muted',
    icon: 'book',
    label: 'Навчання',
  },
  shopping: {
    borderColor: 'border-purple',
    textColor: 'text-purple-muted-foreground',
    bgColor: 'bg-purple-muted',
    icon: 'bag-check',
    label: 'Покупки',
  },
  health: {
    borderColor: 'border-teal',
    textColor: 'text-teal-muted-foreground',
    bgColor: 'bg-teal-muted',
    icon: 'heart-pulse',
    label: 'Здоровʼя',
  },
  misc: {
    borderColor: 'border-muted',
    textColor: 'text-muted-foreground',
    bgColor: 'bg-secondary',
    icon: 'three-dots',
    label: 'Інше',
  },

  salary: {
    borderColor: 'border-success',
    textColor: 'text-success-muted-foreground',
    bgColor: 'bg-success-muted',
    icon: 'cash-stack',
    label: 'Зарплата',
  },
  investments: {
    borderColor: 'border-orange',
    textColor: 'text-orange-muted-foreground',
    bgColor: 'bg-orange-muted',
    icon: 'graph-up',
    label: 'Інвестиції',
  },
  freelance: {
    borderColor: 'border-teal',
    textColor: 'text-teal-muted-foreground',
    bgColor: 'bg-teal-muted',
    icon: 'laptop',
    label: 'Фріланс',
  },
  scholarship: {
    borderColor: 'border-primary',
    textColor: 'text-primary',
    bgColor: 'bg-accent',
    icon: 'mortarboard',
    label: 'Стипендія',
  },
};
