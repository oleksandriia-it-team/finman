import { ChartCardLayout } from '@frontend/components/chart-card-template/chart-card-template';
import { ChartFiltersButton } from '@frontend/components/chart-filters-button/chart-filters-button';
import { IncomesExpensesChart } from '@frontend/entities/analytics/incomes-expenses-chart/incomes-expenses-chart';
import type { IncomeExpenseDataItem } from '@frontend/entities/analytics/incomes-expenses-chart/props/incomes-expenses-chart.props';

interface IncomesExpensesChartCardProps {
  data: IncomeExpenseDataItem[];
}

export function IncomesExpensesChartCard({ data }: IncomesExpensesChartCardProps) {
  return (
    <ChartCardLayout.Root>
      <ChartCardLayout.Header
        title="Аналітика доходів та витрат"
        description="Огляд доходів та витрат за визначений період"
      >
        <ChartFiltersButton
          icon="funnel"
          title="Фільтра"
          counter={5}
          size="sm"
        />
      </ChartCardLayout.Header>
      <ChartCardLayout.Content>
        <IncomesExpensesChart data={data} />
      </ChartCardLayout.Content>
    </ChartCardLayout.Root>
  );
}
