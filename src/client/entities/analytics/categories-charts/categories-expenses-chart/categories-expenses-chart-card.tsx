'use client';

import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';
import { useTranslations } from 'next-intl';

interface CategoriesExpensesChartCardProps extends CategoriesChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function CategoriesExpensesChartCard({ data, loading, filterTrigger }: CategoriesExpensesChartCardProps) {
  const t = useTranslations('analytics.categories');
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title={t('expensesTitle')}
        description={t('expensesDescription')}
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? <FinLoaderShort /> : <CategoriesExpensesChart data={data} />}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
