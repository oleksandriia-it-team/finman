'use client';

import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { BudgetVsActualChart } from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart';
import type { BudgetVsActualChartProps } from '@frontend/entities/analytics/budget-vs-actual-chart/props/budget-vs-actual-props';
import { useTranslations } from 'next-intl';

interface BudgetVsActualChartCardProps extends BudgetVsActualChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function BudgetVsActualChartCard({ data, loading, filterTrigger }: BudgetVsActualChartCardProps) {
  const t = useTranslations('analytics.budgetVsActual');
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title={t('title')}
        description={t('description')}
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? <FinLoaderShort /> : <BudgetVsActualChart data={data} />}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
