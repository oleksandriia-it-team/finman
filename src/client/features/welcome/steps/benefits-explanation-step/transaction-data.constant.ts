import { type AllCategories, ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';

export const TransactionsData = [
  {
    id: 1,
    icon: 'briefcase-fill',
    titleKey: 'transfer',
    descriptionKey: 'income',
    sum: 250,
    type: TypeEntry.Income,
    category: IncomeCategories.Misc,
  },
  {
    id: 2,
    icon: 'car-front-fill',
    titleKey: 'bus',
    descriptionKey: 'personalExpenses',
    sum: 15,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Transport,
  },
  {
    id: 3,
    icon: 'music-note-beamed',
    titleKey: 'concert',
    descriptionKey: 'personalExpenses',
    sum: 100,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Entertainment,
  },
  {
    id: 4,
    icon: 'cup-hot-fill',
    titleKey: 'coffee',
    descriptionKey: 'personalExpenses',
    sum: 81,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Entertainment,
  },
  {
    id: 5,
    icon: 'pencil',
    titleKey: 'stationery',
    descriptionKey: 'personalExpenses',
    sum: 78,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Education,
  },
  {
    id: 6,
    icon: 'fork-knife',
    titleKey: 'restaurant',
    descriptionKey: 'personalExpenses',
    sum: 700,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Entertainment,
  },
] as const satisfies ReadonlyArray<{
  id: number;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  sum: number;
  type: TypeEntry.Income | TypeEntry.Expense;
  category: AllCategories;
}>;
