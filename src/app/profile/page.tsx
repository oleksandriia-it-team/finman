'use client';

import { useUserInformation } from '../../client/entities/user-information/use-user-information.store';

export default function UserProfilePage() {
  const user = useUserInformation((state) => state.userInformation);

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <p>{user?.userName}</p>
      <p>{user?.preferableLocale}</p>
      <p>{user?.language}</p>
    </div>
  );
}
