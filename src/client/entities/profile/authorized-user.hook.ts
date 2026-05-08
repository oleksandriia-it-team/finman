'use client';

import constate from 'constate';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import type { GetUser } from '@common/records/user.record';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';

function useAuthorizedLogic(): GetUser {
  const user = useUserInformation((state) => state.userInformation);

  const userInfoState = useUserInformation((state) => state.userInfoState);

  if (userInfoState === PromiseState.Error || !user) {
    throw Error('User not found');
  }

  return user;
}

export const [AuthorizedUserProvider, useAuthorizedUser] = constate(useAuthorizedLogic);
