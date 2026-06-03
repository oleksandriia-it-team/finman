'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FinModalFormWrapper } from '@frontend/components/wrappers/fin-modal-form-wrapper';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { type CountryFormData, CountryFormSchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { useCountryMutations } from '@frontend/features/admin/lookups/hooks/use-country-mutations.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: (CountryFormData & { id: number }) | undefined;
  onSuccessCallback?: () => void;
}

export function CountryFormModal({ isOpen, onClose, initialData, onSuccessCallback }: Props) {
  const t = useTranslations('admin.country');
  const tCommon = useTranslations('admin.common');
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
      title: tCommon('successTitle'),
      description: initialData ? tCommon('dataUpdated') : tCommon('recordAdded'),
      variant: 'default',
    });
    onSuccessCallback?.();
    onClose();
  });

  return (
    <FinModalFormWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? t('editTitle') : t('addTitle')}
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
            label={t('countryEnLabel')}
            placeholder={t('countryEnPlaceholder')}
          />

          <FinControlledInput
            name="countryUkName"
            label={t('countryUkLabel')}
            placeholder={t('countryUkPlaceholder')}
          />

          <FinControlledInput
            name="localeName"
            label={t('localeLabel')}
            placeholder={t('localePlaceholder')}
          />
        </form>
      </FormProvider>
    </FinModalFormWrapper>
  );
}
