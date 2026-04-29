'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UiAdminModal } from '@frontend/components/admin-modal/fin-admin-modal';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';

const currencySchema = z.object({
  name: z.string().min(1, "Обов'язкове поле"),
  code: z.string().length(3, 'Код повинен містити рівно 3 символи'),
  symbol: z.string().min(1, "Обов'язкове поле"),
});

type CurrencyFormData = z.infer<typeof currencySchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: (CurrencyFormData & { id: number }) | undefined;
}

export function CurrencyFormModal({ isOpen, onClose, initialData }: Props) {
  const methods = useForm<CurrencyFormData>({
    resolver: zodResolver(currencySchema),
    defaultValues: initialData || { name: '', code: '', symbol: '' },
  });

  const { mutate, isPending } = useSendDataFetch(
    async (data: CurrencyFormData) => {
      if (initialData) {
        return fetchClient.put(`/api/lookups/update/${initialData.id}`, data);
      }
      return fetchClient.post('/api/lookups/create', data);
    },
    {
      /* ... */
    },
  );

  return (
    <UiAdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Редагувати валюту' : 'Додати валюту'}
      formId="currency-form"
      isLoading={isPending}
    >
      <FormProvider {...methods}>
        <form
          id="currency-form"
          onSubmit={methods.handleSubmit((d) => mutate(d))}
          className="space-y-4"
        >
          <FinControlledInput
            name="name"
            label="Ім'я"
            placeholder="Наприклад: Долар США"
          />
          <FinControlledInput
            name="code"
            label="Код"
            placeholder="USD"
          />
          <FinControlledInput
            name="symbol"
            label="Символ"
            placeholder="$"
          />
        </form>
      </FormProvider>
    </UiAdminModal>
  );
}
