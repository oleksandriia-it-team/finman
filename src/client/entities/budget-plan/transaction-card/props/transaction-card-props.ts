import { type ReactNode } from 'react';
import { type AllCategories } from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';
import type { RegularEntry } from '@common/records/regular-entry.record';

export type TransactionType = 'income' | 'expense' | 'credit' | 'savings';

export interface TransactionCardProps extends RegularEntry {
  icon?: ReactNode;
  className?: string;
  bgNone?: boolean;
}

export interface TransactionCardRegularProps extends TransactionCardProps {
  category: AllCategories;
}
