'use client';

import { useAuthorizedUser } from '@frontend/entities/user-information/authorized-user.hook';

export default function UserProfilePage() {
  const user = useAuthorizedUser();

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <p>{user.name}</p>
      <p>{user.currencyCode}</p>
      <p>{user.language}</p>
    </div>
  );
}
