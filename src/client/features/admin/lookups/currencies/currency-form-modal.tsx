'use client';

import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FinModalFormWrapper } from '@frontend/components/wrappers/fin-modal-form-wrapper';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { type CurrencyFormData, createCurrencyFormSchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { useCurrencyMutations } from '@frontend/features/admin/lookups/hooks/use-currency-mutations.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useTranslations } from 'next-intl';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: (CurrencyFormData & { id: number }) | undefined;
  onSuccessCallback?: () => void;
}

export function CurrencyFormModal({ isOpen, onClose, initialData, onSuccessCallback }: Props) {
  const t = useTranslations('admin.currency');
  const tCommon = useTranslations('admin.common');
  const tLV = useTranslations('admin.lookupsValidation');
  const { showToast } = useGlobalToast();

  const schema = useMemo(
    () =>
      createCurrencyFormSchema({
        required: tLV('required'),
        currencyCodeLength: tLV('currencyCodeLength'),
        emptyUpdate: tLV('emptyUpdate'),
        statusRequired: tLV('statusRequired'),
      }),
    [tLV],
  );

  const methods = useForm<CurrencyFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', code: '', symbol: '' },
  });

  useEffect(() => {
    if (isOpen) {
      methods.reset(initialData ?? { name: '', code: '', symbol: '' });
    }
  }, [isOpen, initialData, methods]);

  const { submitMutation } = useCurrencyMutations(() => {
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
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
          />
          <FinControlledInput
            name="code"
            label={t('codeLabel')}
            placeholder={t('codePlaceholder')}
          />
          <FinControlledInput
            name="symbol"
            label={t('symbolLabel')}
            placeholder={t('symbolPlaceholder')}
          />
        </form>
      </FormProvider>
    </FinModalFormWrapper>
  );
}
