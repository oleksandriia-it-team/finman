'use client';

import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { BudgetPlanEditScreen } from '@frontend/features/budget-plan/budget-plan-edit-screen';

export function BudgetPlanEditRouteShell() {
  useHidePlusButton();

  return <BudgetPlanEditScreen />;
}
