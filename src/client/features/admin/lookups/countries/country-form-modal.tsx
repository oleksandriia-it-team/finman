'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UiAdminModal } from '@frontend/components/admin-modal/fin-admin-modal';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';

const countrySchema = z.object({
  countryName: z.string().min(1, "Обов'язкове поле"),
  localeName: z.string().min(1, "Обов'язкове поле"),
});

type CountryFormData = z.infer<typeof countrySchema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: (CountryFormData & { id: number }) | undefined;
}

export function CountryFormModal({ isOpen, onClose, initialData }: Props) {
  const methods = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: initialData || { countryName: '', localeName: '' },
  });

  const { mutate, isPending } = useSendDataFetch(
    async (data: CountryFormData) => {
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
      title={initialData ? 'Редагувати країну' : 'Додати країну'}
      formId="country-form"
      isLoading={isPending}
    >
      <FormProvider {...methods}>
        <form
          id="country-form"
          onSubmit={methods.handleSubmit((d) => mutate(d))}
          className="space-y-4"
        >
          <FinControlledInput
            name="countryName"
            label="Назва країни"
            placeholder="Україна"
          />
          <FinControlledInput
            name="localeName"
            label="Назва локалі"
            placeholder="uk-UA"
          />
        </form>
      </FormProvider>
    </UiAdminModal>
  );
}
