import { type ReactNode } from 'react';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { AllCategories } from '@common/enums/categories.enum';

export type TransactionType = 'income' | 'expense' | 'credit' | 'savings';

export interface TransactionCardProps extends RegularEntry {
  icon?: ReactNode;
  className?: string;
  bgNone?: boolean;
}

export interface TransactionCardRegularProps extends TransactionCardProps {
  category: AllCategories;
}
