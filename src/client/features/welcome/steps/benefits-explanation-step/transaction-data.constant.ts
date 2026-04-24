import { TypeEntry } from '@common/enums/entry.enum';

export const TransactionsData = [
  { id: 1, icon: '💶', title: 'Переказ коштів', subtitle: 'Надходження', amount: 250, type: TypeEntry.Income },
  { id: 2, icon: '🚍', title: 'Автобус', subtitle: 'Особисті витрати', amount: 15, type: TypeEntry.Expense },
  { id: 3, icon: '🎶', title: 'Концерт', subtitle: 'Особисті витрати', amount: 100, type: TypeEntry.Expense },
  { id: 4, icon: '☕', title: "Кав'ярня", subtitle: 'Особисті витрати', amount: 81, type: TypeEntry.Expense },
  { id: 5, icon: '📌', title: 'Канцелярія', subtitle: 'Особисті витрати', amount: 78, type: TypeEntry.Expense },
  { id: 6, icon: '🍱', title: 'Ресторан', subtitle: 'Особисті витрати', amount: 700, type: TypeEntry.Expense },
] as const;
