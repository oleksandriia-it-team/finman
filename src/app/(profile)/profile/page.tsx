'use client';

import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';

export default function UserProfilePage() {
  const user = useAuthorizedUser();

  return <div className="flex flex-col items-center justify-center p-5">{user.name}</div>;
}
