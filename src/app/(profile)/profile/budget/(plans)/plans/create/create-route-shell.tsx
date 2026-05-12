'use client';

import { useHidePlusButton } from 'src/client/widgets/profile-mobile-navbar/use-hide-plus-button';
import { BudgetPlanCreateScreen } from 'src/client/features/budget-plan/budget-plan-create-screen';

export function BudgetPlanCreateRouteShell() {
  useHidePlusButton();

  return <BudgetPlanCreateScreen />;
}
