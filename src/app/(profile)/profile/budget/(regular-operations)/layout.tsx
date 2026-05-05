'use client';

import { RegularIncomesExpensesProvider } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';

export default function RegularOperationsLayout({ children }: ChildrenComponentProps) {
  useSetCenterButton('/profile/tracking-operations/add');
  return <RegularIncomesExpensesProvider>{children}</RegularIncomesExpensesProvider>;
}
