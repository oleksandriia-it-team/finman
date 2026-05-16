import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import type { BudgetPlanTitleProps } from '@frontend/entities/budget-plan/components/props/budget-plan-title.props';

export interface SelectBudgetPlanContentProps extends BudgetPlanTitleProps {
  onSelect: (value: GetBudgetPlanDto) => void;
}
