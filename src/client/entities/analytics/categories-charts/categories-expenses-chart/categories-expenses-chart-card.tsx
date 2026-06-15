'use client';

import type { ReactNode } from 'react';
import { ChartCard } from '@frontend/components/chart-card-template/chart-card-template';
import type { ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';
import { useTranslations } from 'next-intl';

interface CategoriesExpensesChartCardProps extends CategoriesChartProps {
  loading?: boolean | undefined;
  filterTrigger?: ReactNode | undefined;
  emptyAction?: ChartEmptyAction | undefined;
}

export function CategoriesExpensesChartCard({
  data,
  loading,
  filterTrigger,
  emptyAction,
}: CategoriesExpensesChartCardProps) {
  const t = useTranslations('analytics');
  return (
    <ChartCard
      title={t('categories.expensesTitle')}
      description={t('categories.expensesDescription')}
      filterTrigger={filterTrigger}
      loading={loading}
      isEmpty={data.length === 0}
      emptyTitle={t('empty.title')}
      emptyDescription={t('empty.noTransactions')}
      emptyAction={emptyAction}
    >
      <CategoriesExpensesChart data={data} />
    </ChartCard>
  );
}
