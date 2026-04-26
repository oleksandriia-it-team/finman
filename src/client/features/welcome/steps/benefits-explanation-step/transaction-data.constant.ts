import { TypeEntry } from '@common/enums/entry.enum';

export const TransactionsData = [
  {
    id: 1,
    icon: 'briefcase-fill',
    title: 'Переказ коштів',
    description: 'Надходження',
    check: '+ 250 ₴',
    type: TypeEntry.Income,
  },
  {
    id: 2,
    icon: 'car-front-fill',
    title: 'Автобус',
    description: 'Особисті витрати',
    check: '- 15 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 3,
    icon: 'music-note-beamed',
    title: 'Концерт',
    description: 'Особисті витрати',
    check: '- 100 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 4,
    icon: 'cup-hot-fill',
    title: "Кав'ярня",
    description: 'Особисті витрати',
    check: '- 81 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 5,
    icon: 'pencil',
    title: 'Канцелярія',
    description: 'Особисті витрати',
    check: '- 78 ₴',
    type: TypeEntry.Expense,
  },
  {
    id: 6,
    icon: 'fork-knife',
    title: 'Ресторан',
    description: 'Особисті витрати',
    check: '- 700 ₴',
    type: TypeEntry.Expense,
  },
] as const;
