import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { totpApiClient } from '@frontend/entities/totp/totp.api.client';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { useAuthorizedUser } from '@frontend/entities/auth/authorized-user.hook';
import type { OnlineUser } from '@common/records/user.record';

export function useCancel2FA() {
  const update = useUserInformation((state) => state.setUserInformation);

  const user = useAuthorizedUser() as OnlineUser;

  const mutation = useSendDataFetch(
    () => {
      return totpApiClient.cancel();
    },
    {
      successMessage: 'Двофакторна автентифікація успішно скинута',
      onSuccess: () => {
        update({ ...user, totpEnabled: false });
      },
    },
  );

  return {
    ...mutation,
    state: getPromiseState(mutation.status),
  };
}
