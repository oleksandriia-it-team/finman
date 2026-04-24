import { type ReactNode } from 'react';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export type TransactionType = 'income' | 'expense';

export interface TransactionCardProps extends Omit<RegularEntry, DefaultColumnKeys | 'regular'> {
  icon?: ReactNode;
  className?: string;
  bgNone?: boolean;
  createdAt?: Date;
  id?: number;
}
