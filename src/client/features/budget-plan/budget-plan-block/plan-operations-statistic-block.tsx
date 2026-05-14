import { UiCard } from 'src/client/shared/ui/ui-card/ui-card';
import { FinTransformCurrency } from 'src/client/shared/components/transform-currency/fin-transform-currency';
import { UiIconBadge } from 'src/client/shared/ui/ui-icon-badge/ui-icon-badge';
import { cn } from 'src/client/shared/utils/cn.util';
import { UiSkeleton } from 'src/client/shared/ui/ui-skeleton/ui-skeleton';

interface PlanOperationsStatisticBlockProps {
  income: number;
  expense: number;
  balance?: number;
  className?: string;
  loading?: boolean;
}

export function PlanOperationsStatisticMobile({
  className,
  income = 0,
  expense = 0,
  balance,
  loading,
}: PlanOperationsStatisticBlockProps) {
  const classes = cn(
    'text-muted-foreground rounded-4xl bg-card w-full max-w-150 mx-auto overflow-hidden p-0 text-center gap-0',
    className,
  );

  const computedBalance = typeof balance === 'number' ? balance : income - expense;

  return (
    <UiCard className={classes}>
      <div className="grid grid-cols-2 divide-x divide-border/60 border-b border-border/60">
        <div className="px-5 py-4 min-h-5 flex flex-col justify-center">
          <p className="text-muted-foreground text-sm leading-none mb-2">Загальний дохід</p>
          <span className="font-bold text-lg leading-none text-success">
            {loading ? <UiSkeleton /> : <FinTransformCurrency value={income} />}
          </span>
        </div>

        <div className="px-5 py-4 min-h-5 flex flex-col justify-center">
          <p className="text-muted-foreground text-sm leading-none mb-2">Загальні витрати</p>
          <span className="font-bold text-lg leading-none text-destructive-foreground">
            {loading ? <UiSkeleton /> : <FinTransformCurrency value={expense} />}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3 min-w-0">
          <UiIconBadge
            name="graph-up-arrow"
            variant="primary"
            size="lg"
          />
          <div className="flex flex-col">
            <p className="text-muted-foreground text-sm leading-none mb-2">Баланс</p>
            <span
              className={cn(
                'font-bold text-lg leading-none',
                computedBalance >= 0 ? 'text-success' : 'text-destructive-foreground',
              )}
            >
              {loading ? <UiSkeleton /> : <FinTransformCurrency value={computedBalance} />}
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <span
            className={cn(
              'px-3.5 py-1.5 text-sm rounded-full font-medium whitespace-nowrap',
              computedBalance > 0
                ? 'bg-success-muted text-success-muted-foreground'
                : computedBalance < 0
                  ? 'bg-destructive-muted text-destructive-muted-foreground'
                  : 'bg-secondary text-secondary-foreground',
            )}
          >
            {loading ? '...' : computedBalance > 0 ? 'Надлишок' : computedBalance < 0 ? 'Дефіцит' : 'Нейтрально'}
          </span>
        </div>
      </div>
    </UiCard>
  );
}

export function PlanOperationsStatisticDesktop({
  className,
  income = 0,
  expense = 0,
  balance,
  loading,
}: PlanOperationsStatisticBlockProps) {
  const classes = cn(
    'text-muted-foreground rounded-4xl px-4 bg-card w-full flex flex-row justify-start gap-5',
    className,
  );

  const stats = [
    {
      icon: 'graph-up-arrow',
      variant: 'success-muted',
      label: 'Загальний дохід',
      value: income,
      className: 'text-success',
    },
    {
      icon: 'graph-down-arrow',
      variant: 'destructive-muted',
      label: 'Загальні витрати',
      value: expense,
      className: 'text-destructive-foreground',
    },
    {
      icon: 'wallet2',
      variant: 'primary-muted',
      label: 'Баланс',
      value: typeof balance === 'number' ? balance : income - expense,
      className:
        typeof balance === 'number'
          ? balance >= 0
            ? 'text-success'
            : 'text-destructive-foreground'
          : income - expense >= 0
            ? 'text-success'
            : 'text-destructive-foreground',
    },
  ] as const;

  return (
    <div className="flex justify-center gap-5 w-full">
      {stats.map(({ icon, variant, label, value, className: textClass }) => (
        <UiCard
          key={label}
          className={classes}
        >
          <div className="flex justify-start gap-2">
            <UiIconBadge
              name={icon}
              variant={variant}
              size="xl"
            />
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-sm">{label}</p>
              <span className={cn('font-bold text-lg flex gap-1', textClass)}>
                {loading && <UiSkeleton />}
                {!loading && <FinTransformCurrency value={value} />}
              </span>
            </div>
          </div>
        </UiCard>
      ))}
    </div>
  );
}
