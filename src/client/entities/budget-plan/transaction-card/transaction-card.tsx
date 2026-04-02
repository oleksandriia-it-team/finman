'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { TransactionCardProps, TransactionType } from './props/transaction-card-props';

const iconBgVariants: Record<TransactionType, string> = {
  income: 'bg-success/10 text-success',
  expense: 'bg-destructive/10 text-destructive',
};

const amountColorVariants: Record<TransactionType, string> = {
  income: 'text-success',
  expense: 'text-destructive',
};

export function TransactionCard({ icon, title, subtitle, amount, type, className, bgNone }: TransactionCardProps) {
  const wrapperClasses = useMemo(() => {
    return clsx(
      'flex items-center md:p-2 p-3 rounded-lg shadow-sm mb-2 border border-muted',
      bgNone ? 'bg-transparent' : 'bg-card',
      className,
    );
  }, [bgNone, className]);

  const iconClasses = useMemo(() => {
    return clsx('rounded-full p-2 mr-2 md:mr-3', type && iconBgVariants[type]);
  }, [type]);

  const amountClasses = useMemo(() => {
    return clsx('font-bold', type && amountColorVariants[type]);
  }, [type]);

  return (
    <div className={wrapperClasses}>
      <div className={iconClasses}>{icon}</div>
      <div className="flex-grow">
        <p className="text-lg font-bold">{title}</p>
        {subtitle && <small className="text-muted-foreground">{subtitle}</small>}
      </div>
      {amount && <span className={amountClasses}>{amount}</span>}
    </div>
  );
}
