'use client';

import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useUserGuard } from '@frontend/entities/user-information/auth-guard.hook';

export default function UserProfilePage() {
  useUserGuard();

  const user = useUserInformation((state) => state.userInformation);

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <p>{user?.userName}</p>
      <p>{user?.preferableLocale}</p>
      <p>{user?.language}</p>
    </div>
  );
}
