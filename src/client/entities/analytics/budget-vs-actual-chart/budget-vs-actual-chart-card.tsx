import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { BudgetVsActualChart } from '@frontend/entities/analytics/budget-vs-actual-chart/budget-vs-actual-chart';
import type { BudgetVsActualChartProps } from '@frontend/entities/analytics/budget-vs-actual-chart/props/budget-vs-actual-props';

interface BudgetVsActualChartCardProps extends BudgetVsActualChartProps {
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function BudgetVsActualChartCard({ data, loading, filterTrigger }: BudgetVsActualChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="План бюджету vs Фактичні витрати"
        description="Порівняння планових та фактичних витрат за категоріями"
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? <FinLoaderShort /> : <BudgetVsActualChart data={data} />}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
