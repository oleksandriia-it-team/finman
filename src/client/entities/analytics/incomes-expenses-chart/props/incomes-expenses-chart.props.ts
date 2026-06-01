import type { Month } from '@common/enums/month.enum';

export interface IncomeExpenseDataItem {
  month: Month;
  incomes: number;
  expenses: number;
}

export interface IncomesExpensesChartProps {
  data: IncomeExpenseDataItem[];
}
