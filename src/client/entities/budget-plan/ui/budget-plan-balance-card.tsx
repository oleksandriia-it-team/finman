'use client';

import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { cn } from '@frontend/shared/utils/cn.util';
import type { BudgetPlanBalanceCardProps } from '@frontend/entities/budget-plan/ui/props/budget-plan-balance-card.props';

export function BudgetPlanBalanceCard({
  totalIncome,
  totalExpense,
  totalBalance,
}: Readonly<BudgetPlanBalanceCardProps>) {
  const hasPositiveBalance = totalBalance >= 0;

  return (
    <div className="bg-card rounded-3xl p-6 shadow-lg space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Загальний дохід</p>
          <p className="text-2xl font-bold text-success">
            <FinTransformCurrency value={totalIncome} />
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Загальні витрати</p>
          <p className="text-2xl font-bold text-destructive">
            <FinTransformCurrency value={totalExpense} />
          </p>
        </div>
      </div>

      <div className="bg-secondary/50 rounded-2xl p-4 flex items-center gap-3">
        <div
          className={cn(
            'w-12 h-12 rounded-full flex items-center justify-center',
            hasPositiveBalance ? 'bg-success/10' : 'bg-destructive/10',
          )}
        >
          <UiSvgIcon
            name={hasPositiveBalance ? 'trending-up' : 'trending-down'}
            size="sm"
            className={cn(hasPositiveBalance ? 'text-success' : 'text-destructive')}
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Баланс</p>
          <p className={cn('text-xl font-bold', hasPositiveBalance ? 'text-success' : 'text-destructive')}>
            <FinTransformCurrency value={totalBalance} />
          </p>
        </div>
        <div
          className={cn(
            'ml-auto px-3 py-1 rounded-full text-xs font-semibold',
            hasPositiveBalance ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
          )}
        >
          {hasPositiveBalance ? 'Надлишок' : 'Дефіцит'}
        </div>
      </div>
    </div>
  );
}
