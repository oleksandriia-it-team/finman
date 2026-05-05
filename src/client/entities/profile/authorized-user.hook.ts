'use client';

import constate from 'constate';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import type { GetUser } from '@common/records/user.record';

function useAuthorizedLogic(): GetUser | null {
  const user = useUserInformation((state) => state.userInformation);
  return user;
}

export const [AuthorizedUserProvider, useAuthorizedUser] = constate(useAuthorizedLogic);
