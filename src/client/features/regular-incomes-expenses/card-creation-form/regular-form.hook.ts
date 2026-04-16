import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegularPaymentFormData,
  RegularPaymentFormSchema,
} from '@frontend/shared/schemas/regular-card-validation-schema';
import type { RegularTransactionRecord } from '@common/records/regular-transaction.record';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';

export function useRegularPaymentForm(initialData?: RegularTransactionRecord, onSuccess?: () => void) {
  const { handleCreate, handleUpdate } = useRegularTransactions();
  const showToast = useGlobalToast((state) => state.showToast);
  const isEdit = !!initialData;

  const methods = useForm<RegularPaymentFormData>({
    resolver: zodResolver(RegularPaymentFormSchema),
    defaultValues: isEdit
      ? {
          subtitle: initialData.subtitle,
          type: initialData.type,
          category: initialData.category,
          amount: initialData.amount,
          frequency: initialData.frequency,
          dayOfMonth: initialData.dayOfMonth,
        }
      : {
          type: 'income',
          dayOfMonth: 1,
        },
  });

  const submit = methods.handleSubmit(
    (data: RegularPaymentFormData) => {
      try {
        if (isEdit && initialData) {
          handleUpdate({ ...initialData, ...data });
        } else {
          handleCreate(data);
        }
        showToast({
          title: 'Успішно',
          description: 'Картку успішно створено',
          variant: 'success',
        });
        onSuccess?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Невідома помилка';
        showToast({
          title: `Помилка ${message}`,
          description: 'Під час заповнення форми виникла помилка',
          variant: 'destructive',
        });
      }
    },
    () => {
      showToast({
        title: 'Перевірте правильність заповнення форми',
        description: 'Форма заповнена некоректно',
        variant: 'destructive',
      });
    },
  );

  return { methods, submit, isEdit };
}
