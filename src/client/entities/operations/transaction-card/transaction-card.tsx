'use client';

import { type TransactionCardProps } from './props/transaction-card-props';
import { type TypeEntry } from '@common/enums/entry.enum';
import { UiInfoBlock } from '@frontend/ui/ui-info-block/ui-info-block';
import { cn } from '@frontend/shared/utils/cn.util';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';

const iconBgVariants: Record<TypeEntry.Income | TypeEntry.Expense, string> = {
  income: 'bg-success/10 text-success',
  expense: 'bg-destructive-foreground/10 text-destructive-foreground',
};

const amountColorVariants: Record<TypeEntry.Income | TypeEntry.Expense, string> = {
  income: 'text-success',
  expense: 'text-destructive-foreground',
};

export function TransactionCard({
  name,
  title,
  description,
  sum,
  type,
  className,
  bgNone,
  check,
}: TransactionCardProps) {
  return (
    <div
      className={cn(
        'w-full flex items-center justify-between md:p-3 p-2 rounded-4xl shadow-lg mb-2 ',
        bgNone ? 'bg-transparent' : 'bg-card',
        className,
      )}
    >
      <UiInfoBlock
        name={name ?? ''}
        title={title ?? ''}
        description={description ?? ''}
        iconClassName={type ? iconBgVariants[type] : ''}
      />

      <div className="flex items-center gap-2">
        {sum && (
          <FinTransformCurrency
            value={sum}
            className={cn('font-bold', type && amountColorVariants[type])}
          />
        )}
        {check && <span className={cn('font-bold', type && amountColorVariants[type])}>{check}</span>}
      </div>
    </div>
  );
}
