'use client';

import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import constate from 'constate';

function useAuthorizedLogic() {
  const user = useUserInformation((state) => state.userInformation);

  console.log(user);

  if (!user) {
    throw Error('User not found');
  }

  return user;
}

export const [AuthorizedUserProvider, useAuthorizedUser] = constate(useAuthorizedLogic);
