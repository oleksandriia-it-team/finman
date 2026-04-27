'use client';

import constate from 'constate';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

function useAuthorizedLogic() {
  const user = useUserInformation((state) => state.userInformation);

  if (!user) {
    throw Error('User not found');
  }

  return user;
}

export const [AuthorizedUserProvider, useAuthorizedUser] = constate(useAuthorizedLogic);
