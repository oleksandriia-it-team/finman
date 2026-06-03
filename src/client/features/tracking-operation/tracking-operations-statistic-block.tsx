'use client';

import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';
import { useTranslations } from 'next-intl';

interface TrackingOperationsStatisticBlockProps {
  income: number;
  expense: number;
  className?: string;
  loading?: boolean;
}

export function TrackingOperationsStatisticMobile({
  className,
  income = 0,
  expense = 0,
  loading,
}: TrackingOperationsStatisticBlockProps) {
  const t = useTranslations('tracking.statistic');
  const classes = cn('text-muted-foreground rounded-4xl px-4 bg-card w-full flex flex-row justify-between', className);

  return (
    <UiCard className={classes}>
      <p className="text-muted-foreground text-sm">{t('periodTotal')}</p>
      <div className="flex font-bold flex-row gap-4">
        <span className="text-success  flex gap-1 ">
          {loading && <UiSkeleton />}
          {!loading && <FinTransformCurrency value={income} />}
        </span>
        <span className="text-destructive-foreground flex gap-1">
          {loading && <UiSkeleton />}
          {!loading && <FinTransformCurrency value={expense} />}
        </span>
      </div>
    </UiCard>
  );
}

export function TrackingOperationsStatisticDesktop({
  className,
  income = 0,
  expense = 0,
  loading,
}: TrackingOperationsStatisticBlockProps) {
  const t = useTranslations('tracking.statistic');
  const classes = cn(
    'text-muted-foreground rounded-4xl px-4 bg-card w-full flex flex-row justify-start gap-5',
    className,
  );

  const stats = [
    {
      icon: 'graph-up-arrow',
      variant: 'success-muted',
      label: t('totalIncome'),
      value: income,
      className: 'text-success',
    },
    {
      icon: 'graph-down-arrow',
      variant: 'destructive-muted',
      label: t('totalExpenses'),
      value: expense,
      className: 'text-destructive-foreground',
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
              <p className="text-muted text-sm">{label}</p>
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
