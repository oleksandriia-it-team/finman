import { type ReactNode } from 'react';

export type TransactionType = 'income' | 'expense';

export interface TransactionCardProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  amount?: string;
  type?: TransactionType;
  className?: string;
  bgNone?: boolean;
}
