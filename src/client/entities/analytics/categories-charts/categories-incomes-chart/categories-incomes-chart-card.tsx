'use client';

import type { ReactNode } from 'react';
import { ChartCard } from '@frontend/components/chart-card-template/chart-card-template';
import type { ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';
import { useTranslations } from 'next-intl';

interface CategoriesIncomesChartCardProps extends CategoriesChartProps {
  loading?: boolean | undefined;
  filterTrigger?: ReactNode | undefined;
  emptyAction?: ChartEmptyAction | undefined;
}

export function CategoriesIncomesChartCard({
  data,
  loading,
  filterTrigger,
  emptyAction,
}: CategoriesIncomesChartCardProps) {
  const t = useTranslations('analytics');
  return (
    <ChartCard
      title={t('categories.incomesTitle')}
      description={t('categories.incomesDescription')}
      filterTrigger={filterTrigger}
      loading={loading}
      isEmpty={data.length === 0}
      emptyTitle={t('empty.title')}
      emptyDescription={t('empty.noTransactions')}
      emptyAction={emptyAction}
    >
      <CategoriesExpensesChart
        data={data}
        totalLabel={t('categories.totalIncomes')}
      />
    </ChartCard>
  );
}
