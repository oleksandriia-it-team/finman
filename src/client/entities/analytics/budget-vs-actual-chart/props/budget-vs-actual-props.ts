export interface BudgetItem {
  label: string;
  plan: number;
  fact: number;
}

export interface BudgetVsActualChartProps {
  data: BudgetItem[];
}
