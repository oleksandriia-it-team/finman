'use client';

import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';
import RegularIncomesExpensesPage from '@frontend/features/regular-incomes-expenses/regular-incomes-expenses-page';

export default function UserMainPage() {
  const user = useAuthorizedUser();

  return <RegularIncomesExpensesPage />;
}
