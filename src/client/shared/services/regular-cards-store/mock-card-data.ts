import { RegularPaymentFrequency } from '@frontend/shared/enums/regular-freequency.enum';
import type { RegularTransactionRecord } from '@common/records/regular-transaction.record';

export const mockRegularTransactions: RegularTransactionRecord[] = [
  {
    id: '1',
    subtitle: 'Виплата за березень',
    type: 'income',
    category: 'salary',
    amount: '45200',
    frequency: RegularPaymentFrequency.Monthly,
    dayOfMonth: 1,
    date: new Date(),
    softDeleted: false,
  },
  {
    id: '2',
    subtitle: 'Оренда квартири',
    type: 'expense',
    category: 'housing',
    amount: '12000',
    frequency: RegularPaymentFrequency.Monthly,
    dayOfMonth: 5,
    date: new Date(),
    softDeleted: false,
  },
  {
    id: '3',
    subtitle: 'Продукти харчування',
    type: 'expense',
    category: 'groceries',
    amount: '8000',
    frequency: RegularPaymentFrequency.Monthly,
    dayOfMonth: 10,
    date: new Date(),
    softDeleted: false,
  },
  {
    id: '4',
    subtitle: 'Лендінг для клієнта',
    type: 'income',
    category: 'freelance',
    amount: '15000',
    frequency: RegularPaymentFrequency.Monthly,
    dayOfMonth: 15,
    date: new Date(),
    softDeleted: false,
  },
];
