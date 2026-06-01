import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { ChartFiltersButton } from '@frontend/components/chart-filters-button/chart-filters-button';
import { BudgetVsActualChart } from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart';
import type { BudgetVsActualChartProps } from '@frontend/entities/analytics/budget-vs-actual-chart/props/budget-vs-actual-props';

export function BudgetVsActualChartCard({ data }: BudgetVsActualChartProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="План бюджету vs Фактичні витрати"
        description="Порівняння планових та фактичних витрат за категоріями"
      >
        <ChartFiltersButton
          icon="funnel"
          title="Фільтра"
          counter={5}
          size="sm"
        />
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        <BudgetVsActualChart data={data} />
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
