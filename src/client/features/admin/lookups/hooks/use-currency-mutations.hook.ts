import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { CurrencyFormData } from '@common/domains/lookups/schemas/lookups-form.schema';

export function useCurrencyMutations(onSuccessCallback?: () => void) {
  const submitMutation = useSendDataFetch(
    async ({ id, data }: { id?: number | undefined; data: CurrencyFormData }) => {
      if (id) {
        return fetchClient.patch(`/api/lookups/currencies/update/${id}`, data);
      }
      return fetchClient.post('/api/lookups/currencies/create', data);
    },
    {
      ...(onSuccessCallback ? { onSuccess: onSuccessCallback } : {}),
    },
  );

  const deleteMutation = useSendDataFetch(
    async (id: number) => {
      return fetchClient.patch(`/api/lookups/currencies/update/${id}`, { softDeleted: 1 });
    },
    {
      ...(onSuccessCallback ? { onSuccess: onSuccessCallback } : {}),
    },
  );

  return { submitMutation, deleteMutation };
}
