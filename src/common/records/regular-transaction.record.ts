import type { RegularPaymentFrequency } from '@frontend/shared/enums/regular-freequency.enum';
import type { TransactionType } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';

export interface RegularTransactionRecord {
  id: string;
  subtitle: string;
  type: TransactionType;
  category: string;
  amount: string;
  frequency: RegularPaymentFrequency;
  dayOfMonth: number;
  date: Date;
  softDeleted: boolean;
}
