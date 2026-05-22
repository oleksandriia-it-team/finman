import { totpApiClient } from '@frontend/entities/totp/totp.api.client';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

export function useConfirm2FASetup() {
  const refresh = useUserInformation((state) => state.refresh);

  const mutation = useSendDataFetch((code: string) => totpApiClient.confirm(code), {
    onSuccess: () => {
      refresh();
    },
  });

  return {
    ...mutation,
    state: getPromiseState(mutation.status),
  };
}
