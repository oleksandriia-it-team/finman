import { type AllCategories, ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';

export const TransactionsData = [
  {
    id: 1,
    icon: 'briefcase-fill',
    title: 'Переказ коштів',
    description: 'Надходження',
    sum: 250,
    type: TypeEntry.Income,
    category: IncomeCategories.Misc,
  },
  {
    id: 2,
    icon: 'car-front-fill',
    title: 'Автобус',
    description: 'Особисті витрати',
    sum: 15,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Transport,
  },
  {
    id: 3,
    icon: 'music-note-beamed',
    title: 'Концерт',
    description: 'Особисті витрати',
    sum: 100,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Entertainment,
  },
  {
    id: 4,
    icon: 'cup-hot-fill',
    title: "Кав'ярня",
    description: 'Особисті витрати',
    sum: 81,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Entertainment,
  },
  {
    id: 5,
    icon: 'pencil',
    title: 'Канцелярія',
    description: 'Особисті витрати',
    sum: 78,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Education,
  },
  {
    id: 6,
    icon: 'fork-knife',
    title: 'Ресторан',
    description: 'Особисті витрати',
    sum: 700,
    type: TypeEntry.Expense,
    category: ExpenseCategories.Entertainment,
  },
] as const satisfies ReadonlyArray<{
  id: number;
  icon: string;
  title: string;
  description: string;
  sum: number;
  type: TypeEntry.Income | TypeEntry.Expense;
  category: AllCategories;
}>;
