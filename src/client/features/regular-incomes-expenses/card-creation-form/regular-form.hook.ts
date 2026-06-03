import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { createRegularEntrySchemas } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { useTranslations } from 'next-intl';

export function useRegularPaymentForm(initialData?: RegularEntry, onSuccess?: () => void) {
  const { handleCreate, handleUpdate } = useRegularTransactions();
  const showToast = useGlobalToast((state) => state.showToast);
  const isEdit = !!initialData;
  const t = useTranslations('regular.form');
  const tCommon = useTranslations('common');
  const tEV = useTranslations('entry.validation');
  const tRV = useTranslations('regular.validation');

  const schema = useMemo(
    () =>
      createRegularEntrySchemas({
        titleRequired: tEV('titleRequired'),
        titleMaxLength: tEV('titleMaxLength', { max: MonthEntryRequirements.MaxTitleLength }),
        descriptionMaxLength: tEV('descriptionMaxLength', { max: MonthEntryRequirements.MaxDescriptionLength }),
        sumRequired: tEV('sumRequired'),
        sumMin: tEV('sumMin', { min: MonthEntryRequirements.MinSumValue }),
        incomeCategoryInvalid: tEV('incomeCategoryInvalid'),
        expenseCategoryInvalid: tEV('expenseCategoryInvalid'),
        frequencyInvalid: tRV('frequencyInvalid'),
        dayInteger: tRV('dayInteger'),
        dayMin: tRV('dayMin'),
        dayMax: tRV('dayMax'),
      }).RegularEntrySchema,
    [tEV, tRV],
  );

  const methods = useForm<RegularEntry>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      type: initialData?.type ?? TypeEntry.Income,
      category: initialData?.category,
      sum: initialData?.sum,
      frequency: initialData?.frequency,
      dayOfMonth: initialData?.dayOfMonth ?? 1,
    } as never,
  });

  const submit = methods.handleSubmit(
    async (data: RegularEntry) => {
      try {
        if (isEdit && initialData) {
          const { title, description, type, category, frequency, dayOfMonth } = data;

          await handleUpdate(initialData.id, {
            title,
            description: description ?? '',
            type,
            category,
            frequency,
            dayOfMonth,
          });
        } else {
          await handleCreate({
            ...data,
            description: data.description ?? '',
          });
        }
        showToast({
          title: tCommon('successTitle'),
          description: isEdit ? t('successUpdated') : t('successCreated'),
          variant: 'success',
        });
        onSuccess?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : tCommon('unknownError');
        showToast({
          title: t('errorTitle', { message }),
          description: t('errorDescription'),
          variant: 'destructive',
        });
      }
    },
    () => {
      showToast({
        title: t('validationTitle'),
        description: t('validationDescription'),
        variant: 'destructive',
      });
    },
  );

  return { methods, submit, isEdit };
}
