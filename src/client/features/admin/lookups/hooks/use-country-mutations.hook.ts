import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { CountryFormData } from '@common/domains/lookups/schemas/lookups-form.schema';

export function useCountryMutations(onSuccessCallback?: () => void) {
  const submitMutation = useSendDataFetch(
    async ({ id, data }: { id?: number | undefined; data: CountryFormData }) => {
      if (id) {
        return fetchClient.put(`/api/lookups/countries-and-locales/update/${id}`, data);
      }
      return fetchClient.post('/api/lookups/countries-and-locales/create', data);
    },
    {
      ...(onSuccessCallback ? { onSuccess: onSuccessCallback } : {}),
    },
  );

  const deleteMutation = useSendDataFetch(
    async (id: number) => {
      return fetchClient.delete(`/api/lookups/countries-and-locales/remove/${id}`);
    },
    {
      ...(onSuccessCallback ? { onSuccess: onSuccessCallback } : {}),
    },
  );

  return { submitMutation, deleteMutation };
}
