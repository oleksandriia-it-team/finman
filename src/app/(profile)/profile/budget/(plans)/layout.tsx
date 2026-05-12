'use client';

import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';

export default function BudgetPlansLayout({ children }: ChildrenComponentProps) {
  useSetCenterButton('/profile/budget/plans/create');

  return children;
}
