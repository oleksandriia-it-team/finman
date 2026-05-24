import { totpApiClient } from '@frontend/entities/totp/totp.api.client';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';

export function useConfirm2FASetup() {
  const mutation = useSendDataFetch((code: string) => totpApiClient.confirm(code));

  return {
    ...mutation,
    state: getPromiseState(mutation.status),
  };
}
