'use client';

import { RegularIncomesExpensesProvider } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export default function RegularOperationsLayout({ children }: ChildrenComponentProps) {
  return <RegularIncomesExpensesProvider>{children}</RegularIncomesExpensesProvider>;
}
