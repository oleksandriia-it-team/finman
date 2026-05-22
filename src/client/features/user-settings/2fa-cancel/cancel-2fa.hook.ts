import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { totpApiClient } from '@frontend/entities/totp/totp.api.client';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

export function useCancel2FA() {
  const refresh = useUserInformation((state) => state.refresh);

  const mutation = useSendDataFetch(
    () => {
      return totpApiClient.cancel();
    },
    {
      successMessage: 'Двофакторна автентифікація успішно скинута',
      onSuccess: () => {
        refresh();
      },
    },
  );

  return {
    ...mutation,
    state: getPromiseState(mutation.status),
  };
}
