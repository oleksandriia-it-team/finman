import { TypeEntry } from '@common/enums/entry.enum';

export const TransactionsData = [
  {
    id: 1,
    icon: 'briefcase-fill',
    titleKey: 'transfer',
    descriptionKey: 'income',
    check: '+ 250 ₴',
    type: TypeEntry.Income,
  },
  {
    id: 2,
    icon: 'car-front-fill',
    titleKey: 'bus',
    descriptionKey: 'personalExpenses',
    check: '- 15 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 3,
    icon: 'music-note-beamed',
    titleKey: 'concert',
    descriptionKey: 'personalExpenses',
    check: '- 100 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 4,
    icon: 'cup-hot-fill',
    titleKey: 'coffee',
    descriptionKey: 'personalExpenses',
    check: '- 81 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 5,
    icon: 'pencil',
    titleKey: 'stationery',
    descriptionKey: 'personalExpenses',
    check: '- 78 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 6,
    icon: 'fork-knife',
    titleKey: 'restaurant',
    descriptionKey: 'personalExpenses',
    check: '- 700 ₴',
    type: TypeEntry.Expense,
  },
] as const;
