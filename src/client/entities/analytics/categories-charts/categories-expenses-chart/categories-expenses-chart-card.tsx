import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { ChartFiltersButton } from '@frontend/components/chart-filters-button/chart-filters-button';
import { CategoriesExpensesChart } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/categories-expenses-chart';
import type { CategoriesChartProps } from '@frontend/entities/analytics/categories-charts/categories-pie-chart/props/categories-expenses-chart.props';

export function CategoriesExpensesChartCard({ data }: CategoriesChartProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Витрати за категоріями"
        description="Розподіл витрат за категоріями за визначений період"
      >
        <ChartFiltersButton
          icon="funnel"
          title="Фільтра"
          counter={5}
          size="sm"
        />
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        <CategoriesExpensesChart data={data} />
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
