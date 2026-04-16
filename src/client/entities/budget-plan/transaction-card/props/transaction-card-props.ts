import { type ReactNode } from 'react';
import { type AllCategories } from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';

export type TransactionType = 'income' | 'expense' | 'credit' | 'savings';

export interface TransactionCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  amount: string;
  type: TransactionType;
  className?: string;
  bgNone?: boolean;
  date?: Date;
}

export interface TransactionCardRegularProps extends TransactionCardProps {
  date?: Date;
  category: AllCategories;
}
