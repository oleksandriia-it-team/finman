'use client';

import { useUserGuard } from '@frontend/entities/profile/auth-guard.hook';
import RegularIncomesExpensesPage from '@frontend/features/regular-incomes-expenses/regular-incomes-expenses-page';

export default function MainPage() {
  const user = useUserGuard();

  if (!user) {
    return null;
  }

  return <RegularIncomesExpensesPage />;
}
