import { RegularPaymentFrequency } from '@common/enums/regular-freequency.enum';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';

export const mockRegularTransactions: RegularEntry[] = [
  {
    id: 1,
    title: '',
    description: 'Виплата за березень',
    type: TypeEntry.Income,
    category: 'salary',
    sum: 45200,
    createdAt: new Date(),
    regular: true,
    softDeleted: 0,
  },
  {
    id: 2,
    title: '',
    description: 'Оренда квартири',
    type: TypeEntry.Expense,
    category: 'housing',
    sum: 12000,
    createdAt: new Date(),
    regular: true,
    softDeleted: 0,
  },
  {
    id: 3,
    title: '',
    description: 'Продукти харчування',
    type: TypeEntry.Expense,
    category: 'groceries',
    sum: 8000,
    frequency: RegularPaymentFrequency.Monthly,
    createdAt: new Date(),
    regular: true,
    softDeleted: 0,
  },
  {
    id: 4,
    title: '',
    description: 'Лендинг для клієнта',
    type: TypeEntry.Income,
    category: 'freelance',
    sum: 15000,
    frequency: RegularPaymentFrequency.Monthly,
    createdAt: new Date(),
    regular: true,
    softDeleted: 0,
  },
];
