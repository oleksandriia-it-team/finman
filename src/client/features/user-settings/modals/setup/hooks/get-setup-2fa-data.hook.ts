import { totpApiClient } from '@frontend/entities/totp/totp.api.client';
import { useQuery } from '@tanstack/react-query';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

export function useGetSetup2FAData() {
  const query = useQuery({
    queryKey: [],
    queryFn: () => totpApiClient.setup(),
  });

  return {
    ...query,
    state: getPromiseState(query.status),
  };
}
