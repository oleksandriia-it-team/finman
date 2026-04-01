'use client';

import { useMemo } from 'react';
import clsx from 'clsx';
import { TransactionCardProps, TransactionType } from './props/transaction-card-props';

const iconBgVariants: Record<TransactionType, string> = {
  income: 'bg-success bg-opacity-10 text-success',
  expense: 'bg-danger bg-opacity-10 text-danger',
};

const amountColorVariants: Record<TransactionType, string> = {
  income: 'text-success',
  expense: 'text-danger',
};

export function TransactionCard({ icon, title, subtitle, amount, type, className }: TransactionCardProps) {
  const wrapperClasses = useMemo(() => {
    return clsx('d-flex items-center md:p-2 p-3 bg-body rounded-3 shadow-sm mb-2 border border-subtle', className);
  }, [className]);

  const iconClasses = useMemo(() => {
    return clsx('rounded-circle p-2 me-2 md:me-3', type && iconBgVariants[type]);
  }, [type]);

  const amountClasses = useMemo(() => {
    return clsx('fw-bold', type && amountColorVariants[type]);
  }, [type]);

  return (
    <div className={wrapperClasses}>
      <div className={iconClasses}>{icon}</div>
      <div className="flex-grow-1">
        <p className=" text-lg mb-0 fw-bold">{title}</p>
        {subtitle && <small className="text-body-secondary">{subtitle}</small>}
      </div>
      {amount && <span className={amountClasses}>{amount}</span>}
    </div>
  );
}
