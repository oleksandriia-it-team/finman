'use client';

import type { ReactNode } from 'react';
import { ChartCard } from '@frontend/components/chart-card-template/chart-card-template';
import type { ChartEmptyAction } from '@frontend/components/chart-empty-state/chart-empty-state';
import { IncomesExpensesChart } from '@frontend/entities/analytics/incomes-expenses-chart/incomes-expenses-chart';
import type { IncomeExpenseDataItem } from '@frontend/entities/analytics/incomes-expenses-chart/props/incomes-expenses-chart.props';
import { useTranslations } from 'next-intl';

interface IncomesExpensesChartCardProps {
  data: IncomeExpenseDataItem[];
  loading?: boolean | undefined;
  filterTrigger?: ReactNode | undefined;
  emptyAction?: ChartEmptyAction | undefined;
}

export function IncomesExpensesChartCard({ data, loading, filterTrigger, emptyAction }: IncomesExpensesChartCardProps) {
  const t = useTranslations('analytics');
  return (
    <ChartCard
      title={t('incomeExpenses.title')}
      description={t('incomeExpenses.description')}
      filterTrigger={filterTrigger}
      loading={loading}
      isEmpty={data.length === 0}
      emptyTitle={t('empty.title')}
      emptyDescription={t('empty.noTransactions')}
      emptyAction={emptyAction}
    >
      <IncomesExpensesChart data={data} />
    </ChartCard>
  );
}
