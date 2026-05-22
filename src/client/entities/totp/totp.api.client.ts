import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import type { TwoFASetupResponse } from '@common/domains/totp/totp-setup-response.model';

export const totpApiClient = {
  setup: async () => {
    return fetchClient
      .post<ApiResultOperationSuccess<TwoFASetupResponse>>('/api/profile/2fa/setup')
      .then((r) => r.data);
  },
  confirm: async (code: string) => {
    return fetchClient.post<ApiResultOperationSuccess<true>>('/api/profile/2fa/confirm', { code }).then((r) => r.data);
  },
};
