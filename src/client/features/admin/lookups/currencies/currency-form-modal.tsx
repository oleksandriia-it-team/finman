'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UiAdminModal } from '@frontend/shared/components/admin-modal/fin-admin-modal';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { CurrencyFormSchema, type CurrencyFormData } from '@common/domains/lookups/schemas/lookups-form.schema';
import { useCurrencyMutations } from '@frontend/features/admin/lookups/hooks/use-currency-mutations.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: (CurrencyFormData & { id: number }) | undefined;
  onSuccessCallback?: () => void;
}

export function CurrencyFormModal({ isOpen, onClose, initialData, onSuccessCallback }: Props) {
  const { showToast } = useGlobalToast();

  const methods = useForm<CurrencyFormData>({
    resolver: zodResolver(CurrencyFormSchema),
    defaultValues: { name: '', code: '', symbol: '' },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset(initialData ?? { name: '', code: '', symbol: '' });
    }
  }, [isOpen, initialData, methods]);

  const { submitMutation } = useCurrencyMutations(() => {
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
      title={initialData ? 'Редагувати валюту' : 'Додати валюту'}
      formId="currency-form"
      isLoading={submitMutation.isPending}
    >
      <FormProvider {...methods}>
        <form
          id="currency-form"
          onSubmit={methods.handleSubmit((data) => submitMutation.mutate({ id: initialData?.id, data }))}
          className="space-y-4"
        >
          <FinControlledInput
            name="name"
            label="Назва *"
            placeholder="Наприклад: Долар США"
          />
          <FinControlledInput
            name="code"
            label="Код *"
            placeholder="Наприклад: USD"
          />
          <FinControlledInput
            name="symbol"
            label="Символ *"
            placeholder="Наприклад: $"
          />
        </form>
      </FormProvider>
    </UiAdminModal>
  );
}
