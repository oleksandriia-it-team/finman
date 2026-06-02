import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';

interface CategoriesExpensesChartCardProps extends CategoriesChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function CategoriesExpensesChartCard({ data, loading, filterTrigger }: CategoriesExpensesChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Витрати за категоріями"
        description="Розподіл витрат за категоріями за визначений період"
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? <FinLoaderShort /> : <CategoriesExpensesChart data={data} />}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
