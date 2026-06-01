import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';

interface CategoriesIncomesChartCardProps extends CategoriesChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function CategoriesIncomesChartCard({ data, loading, filterTrigger }: CategoriesIncomesChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Доходи за категоріями"
        description="Розподіл доходів за категоріями за визначений період"
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? (
          <FinLoaderShort />
        ) : (
          <CategoriesExpensesChart
            data={data}
            totalLabel="всього доходів"
          />
        )}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
