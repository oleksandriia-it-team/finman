'use client';

import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';
import UserMainPage from './main/page';

export default function UserProfileSettingsPage() {
  const user = useAuthorizedUser();

  return <UserMainPage />;
}
