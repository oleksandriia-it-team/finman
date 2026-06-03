'use client';

import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';
import { useTranslations } from 'next-intl';

interface CategoriesIncomesChartCardProps extends CategoriesChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function CategoriesIncomesChartCard({ data, loading, filterTrigger }: CategoriesIncomesChartCardProps) {
  const t = useTranslations('analytics.categories');
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title={t('incomesTitle')}
        description={t('incomesDescription')}
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? (
          <FinLoaderShort />
        ) : (
          <CategoriesExpensesChart
            data={data}
            totalLabel={t('totalIncomes')}
          />
        )}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
