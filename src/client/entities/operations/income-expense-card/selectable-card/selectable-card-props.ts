import type { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';

type RegularCardItem = React.ComponentProps<typeof IncomeExpenseCard> & {
  id: number;
};

export interface SelectableRegularCardProps {
  item: RegularCardItem;
  selected: boolean;
  onToggle: (id: number) => void;
  dimmed?: boolean;
}
