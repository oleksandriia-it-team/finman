import type { ReactNode } from 'react';
import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { IncomesExpensesChart } from '@frontend/entities/analytics/incomes-expenses-chart/incomes-expenses-chart';
import type { IncomeExpenseDataItem } from '@frontend/entities/analytics/incomes-expenses-chart/props/incomes-expenses-chart.props';

interface IncomesExpensesChartCardProps {
  data: IncomeExpenseDataItem[];
  filterTrigger?: ReactNode;
}

export function IncomesExpensesChartCard({ data, filterTrigger }: IncomesExpensesChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Аналітика доходів та витрат"
        description="Огляд доходів та витрат за визначений період"
      >
        {filterTrigger}
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        <IncomesExpensesChart data={data} />
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
