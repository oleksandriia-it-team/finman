import { totpApiClient } from '@frontend/entities/totp/totp.api.client';
import { useMutation } from '@tanstack/react-query';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

export function useConfirm2FASetup() {
  const mutation = useMutation({
    mutationFn: (code: string) => totpApiClient.confirm(code),
  });

  return {
    ...mutation,
    state: getPromiseState(mutation.status),
  };
}
