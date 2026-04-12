'use client';

import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';

export default function UserProfileSettingsPage() {
  const user = useAuthorizedUser();

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <p>{user.userName}</p>
      <p>{user.preferableLocale}</p>
      <p>{user.language}</p>
    </div>
  );
}
