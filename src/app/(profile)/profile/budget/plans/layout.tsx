'use client';

import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { SelectedBudgetPlanProvider } from '@frontend/features/budget-plan/hooks/selected-budget-plan.hook';

export default function BudgetPlanLayout({ children }: ChildrenComponentProps) {
  return <SelectedBudgetPlanProvider>{children}</SelectedBudgetPlanProvider>;
}
