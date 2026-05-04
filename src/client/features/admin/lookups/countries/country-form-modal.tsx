'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UiAdminModal } from '@frontend/shared/components/admin-modal/fin-admin-modal';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { CountryFormSchema, type CountryFormData } from '@common/domains/lookups/schemas/lookups-form.schema';
import { useCountryMutations } from '@frontend/features/admin/lookups/hooks/use-country-mutations.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: (CountryFormData & { id: number }) | undefined;
  onSuccessCallback?: () => void;
}

export function CountryFormModal({ isOpen, onClose, initialData, onSuccessCallback }: Props) {
  const { showToast } = useGlobalToast();

  const methods = useForm<CountryFormData>({
    resolver: zodResolver(CountryFormSchema),
    defaultValues: { countryName: '', localeName: '' },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset(initialData ?? { countryName: '', localeName: '' });
    }
  }, [isOpen, initialData, methods]);

  const { submitMutation } = useCountryMutations(() => {
    showToast({
      title: 'Успішно',
      description: initialData ? 'Дані оновлено' : 'Запис додано',
      variant: 'default',
    });
    onSuccessCallback?.();
    onClose();
  });

  return (
    <UiAdminModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Редагувати країну' : 'Додати країну'}
      formId="country-form"
      isLoading={submitMutation.isPending}
    >
      <FormProvider {...methods}>
        <form
          id="country-form"
          onSubmit={methods.handleSubmit((data) => submitMutation.mutate({ id: initialData?.id, data }))}
          className="space-y-4"
        >
          <FinControlledInput
            name="countryName"
            label="Країна *"
            placeholder="Наприклад: Україна"
          />
          <FinControlledInput
            name="localeName"
            label="Локаль *"
            placeholder="Наприклад: uk-UA"
          />
        </form>
      </FormProvider>
    </UiAdminModal>
  );
}
