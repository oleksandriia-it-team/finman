'use client';

import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';

export default function UserMainPage() {
  const user = useAuthorizedUser();

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <p>MainPage</p>
    </div>
  );
}
