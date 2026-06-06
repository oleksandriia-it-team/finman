'use client';

import RegularIncomesExpensesScreen from '@frontend/features/regular-incomes-expenses/regular-incomes-expenses-screen';
import { useSetCenterButton } from '@frontend/widgets/profile-mobile-navbar/center-button-nav/use-set-center-button';

export default function UserMainPage() {
  useSetCenterButton({ url: '/profile/budget/regular-operations/add', icon: 'plus' });
  return <RegularIncomesExpensesScreen />;
}
