import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { RegularEntrySchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { useTranslations } from 'next-intl';

export function useRegularPaymentForm(initialData?: RegularEntry, onSuccess?: () => void) {
  const { handleCreate, handleUpdate } = useRegularTransactions();
  const showToast = useGlobalToast((state) => state.showToast);
  const isEdit = !!initialData;
  const t = useTranslations('regular.form');
  const tCommon = useTranslations('common');

  const methods = useForm<RegularEntry>({
    resolver: zodResolver(RegularEntrySchema) as never,
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
