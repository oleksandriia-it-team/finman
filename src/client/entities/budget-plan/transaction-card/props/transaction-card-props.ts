import { ReactNode } from 'react';
import { AllCategories } from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';

export type TransactionType = 'income' | 'expense';

export interface TransactionCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  amount: string;
  type: TransactionType;
  category: AllCategories;
  className?: string;
  bgNone?: boolean;
  date?: Date;
}
