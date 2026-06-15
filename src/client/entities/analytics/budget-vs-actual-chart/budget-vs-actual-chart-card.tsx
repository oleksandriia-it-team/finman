'use client';

import type { ReactNode } from 'react';
import { ChartCard } from '@frontend/components/chart-card-template/chart-card-template';
import type { ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
import { BudgetVsActualChart } from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart';
import type { BudgetVsActualChartProps } from '@frontend/entities/analytics/budget-vs-actual-chart/props/budget-vs-actual-props';
import { useTranslations } from 'next-intl';

interface BudgetVsActualChartCardProps extends BudgetVsActualChartProps {
  loading?: boolean | undefined;
  filterTrigger?: ReactNode | undefined;
  emptyAction?: ChartEmptyAction | undefined;
}

export function BudgetVsActualChartCard({ data, loading, filterTrigger, emptyAction }: BudgetVsActualChartCardProps) {
  const t = useTranslations('analytics');
  return (
    <ChartCard
      title={t('budgetVsActual.title')}
      description={t('budgetVsActual.description')}
      filterTrigger={filterTrigger}
      loading={loading}
      isEmpty={data.length === 0}
      emptyTitle={t('empty.title')}
      emptyDescription={t('empty.noBudgetPlan')}
      emptyAction={emptyAction}
    >
      <BudgetVsActualChart data={data} />
    </ChartCard>
  );
}
