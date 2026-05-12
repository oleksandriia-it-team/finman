'use client';

import { useHidePlusButton } from 'src/client/widgets/profile-mobile-navbar/use-hide-plus-button';
import { BudgetPlanRecommendationsScreen } from 'src/client/features/budget-plan/budget-plan-recommendations-screen';

export function BudgetPlanRecommendationsRouteShell() {
  useHidePlusButton();

  return <BudgetPlanRecommendationsScreen />;
}
