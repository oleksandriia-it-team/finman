import type { ReactNode } from 'react';

export type MonthVariant = 'primary' | 'primary-muted' | 'default';

export interface MonthGridPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerLabel: string;
  headerLabel: string;
  viewDate: Date;
  onViewDateChange: (date: Date) => void;
  getMonthVariant: (date: Date) => MonthVariant;
  onMonthClick: (date: Date) => void;
  footer?: ReactNode;
}
