'use client';

import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { RegularIncomesExpensesProvider } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';

export default function RegularOperationsLayout({ children }: ChildrenComponentProps) {
  return <RegularIncomesExpensesProvider>{children}</RegularIncomesExpensesProvider>;
}
