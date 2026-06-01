import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';

interface CategoriesExpensesChartCardProps extends CategoriesChartProps {
  filterTrigger?: ReactNode;
}

export function CategoriesExpensesChartCard({ data, filterTrigger }: CategoriesExpensesChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Витрати за категоріями"
        description="Розподіл витрат за категоріями за визначений період"
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        <CategoriesExpensesChart data={data} />
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
