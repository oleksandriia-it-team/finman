'use client';

import { useUserGuard } from '@frontend/entities/profile/auth-guard.hook';

export default function UserProfilePage() {
  const user = useUserGuard();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <p>{user.userName}</p>
      <p>{user.preferableLocale}</p>
      <p>{user.language}</p>
    </div>
  );
}
