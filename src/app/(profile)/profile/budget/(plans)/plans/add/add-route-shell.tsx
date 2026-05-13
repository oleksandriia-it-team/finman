'use client';

import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { BudgetPlanAddMonthOperationScreen } from '@frontend/features/budget-plan/budget-plan-add-month-operation-screen';

export function BudgetPlanAddMonthOperationRouteShell() {
  useHidePlusButton();

  return <BudgetPlanAddMonthOperationScreen />;
}
