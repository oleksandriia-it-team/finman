import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';
import type {
  BudgetPlanStatisticBlockProps,
  StatItem,
} from '@frontend/features/budget-plan/components/props/budget-plan-statistic-props';

// для дімончика: я хз чи є в нас компонент для цього бейджика, тому поки хай буде цей, якщо що потім заміню))
function BalanceBadge({ balance }: { balance: number }) {
  const isSurplus = balance >= 0;
  return (
    <span
      className={cn(
        'text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap',
        isSurplus ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive-foreground',
      )}
    >
      {isSurplus ? 'Надлишок' : 'Дефіцит'}
    </span>
  );
}

export function BudgetPlanStatisticMobile({ className, income = 0, expense = 0 }: BudgetPlanStatisticBlockProps) {
  const balance = income - expense;
  const isPositive = balance >= 0;

  return (
    <UiCard className={cn('rounded-3xl px-4 py-4 bg-card w-full gap-0', className)}>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className=" text-muted-foreground text-xs">Загальний дохід</p>
          <span className="font-bold text-success">
            <FinTransformCurrency value={income} />
          </span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <p className=" text-muted-foreground text-xs">Загальні витрати</p>
          <span className="font-bold text-destructive-foreground">
            <FinTransformCurrency value={expense} />
          </span>
        </div>
      </div>

      <div className="border-t border-border my-3" />

      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center gap-2">
          <UiIconBadge
            name={isPositive ? 'graph-up-arrow' : 'graph-down-arrow'}
            variant={isPositive ? 'success-muted' : 'destructive-muted'}
            size="default"
            isRoundedFull
          />
          <div className="flex flex-col gap-0.5">
            <p className="text-muted-foreground text-xs">Баланс</p>
            <div
              className={cn('font-bold flex items-center', isPositive ? 'text-success' : 'text-destructive-foreground')}
            >
              {isPositive && <span>+</span>}
              <FinTransformCurrency value={balance} />
            </div>
          </div>
        </div>
        <BalanceBadge balance={balance} />
      </div>
    </UiCard>
  );
}

export function BudgetPlanStatisticDesktop({ className, income = 0, expense = 0 }: BudgetPlanStatisticBlockProps) {
  const balance = income - expense;
  const isPositive = balance >= 0;

  const mainStats: StatItem[] = [
    {
      icon: 'graph-up-arrow',
      variant: 'success-muted',
      label: 'Загальний дохід',
      value: income,
      textClass: 'text-success',
    },
    {
      icon: 'graph-down-arrow',
      variant: 'destructive-muted',
      label: 'Загальні витрати',
      value: expense,
      textClass: 'text-destructive-foreground',
    },
    {
      icon: 'wallet2',
      variant: 'primary-muted',
      label: 'Баланс',
      value: balance,
      textClass: isPositive ? 'text-success' : 'text-destructive-foreground',
      prefix: isPositive ? '+' : '',
      spanFull: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {mainStats.map(({ icon, variant, label, value, textClass, prefix, spanFull }) => (
        <UiCard
          key={label}
          className={cn(
            'text-muted-foreground rounded-3xl px-4 py-4 bg-card flex flex-row justify-start gap-4',
            spanFull && 'col-span-2 lg:col-span-1',
            className,
          )}
        >
          <div className="flex justify-start gap-2">
            <UiIconBadge
              name={icon}
              variant={variant}
              size="xl"
            />
            <div className="flex flex-col gap-2">
              <p className="text-muted text-sm">{label}</p>
              <div className={cn('font-bold text-lg flex items-center', textClass)}>
                {prefix && <span>{prefix}</span>}
                <FinTransformCurrency value={value} />
              </div>
            </div>
          </div>
        </UiCard>
      ))}
    </div>
  );
}
