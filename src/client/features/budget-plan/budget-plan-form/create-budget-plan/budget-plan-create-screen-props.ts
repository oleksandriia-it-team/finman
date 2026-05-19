import type { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import type { MonthOperationItem } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

export type MonthOperation = React.ComponentProps<typeof IncomeExpenseCard> & MonthOperationItem;

export interface BudgetPlanFormScreenProps {
  initialData?: BudgetPlanDetailed;
  initialSelectedIds?: number[];
  initialMonthOperations?: MonthOperation[];
  onSuccess?: () => void;
  onCancel: () => void;
  onAddMonthOperation: (onCreate: (op: Omit<MonthOperation, 'id'>) => void) => void;
}
