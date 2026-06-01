import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { IncomesExpensesChart } from '@frontend/entities/analytics/incomes-expenses-chart/incomes-expenses-chart';
import type { IncomeExpenseDataItem } from '@frontend/entities/analytics/incomes-expenses-chart/props/incomes-expenses-chart.props';

interface IncomesExpensesChartCardProps {
  data: IncomeExpenseDataItem[];
  loading?: boolean;
  filterTrigger?: ReactNode;
}

export function IncomesExpensesChartCard({ data, loading, filterTrigger }: IncomesExpensesChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Аналітика доходів та витрат"
        description="Огляд доходів та витрат за визначений період"
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        {loading ? <FinLoaderShort /> : <IncomesExpensesChart data={data} />}
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
