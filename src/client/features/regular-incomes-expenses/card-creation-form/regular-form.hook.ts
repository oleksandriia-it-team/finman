import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type RegularPaymentFormData,
  RegularPaymentFormSchema,
} from '@frontend/shared/schemas/regular-card-validation-schema';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';

export function useRegularPaymentForm(initialData?: RegularEntry, onSuccess?: () => void) {
  const { handleCreate, handleUpdate } = useRegularTransactions();
  const showToast = useGlobalToast((state) => state.showToast);
  const isEdit = !!initialData;

  const methods = useForm<RegularPaymentFormData>({
    resolver: zodResolver(RegularPaymentFormSchema),
    defaultValues: isEdit
      ? {
          title: initialData.title,
          description: initialData.description,
          type: initialData.type,
          category: initialData.category,
          sum: initialData.sum,
          frequency: initialData.frequency,
          dayOfMonth: 1,
        }
      : {
          type: TypeEntry.Income,
          dayOfMonth: 1,
        },
  });

  const submit = methods.handleSubmit(
    async (data: RegularPaymentFormData) => {
      try {
        const { dayOfMonth, ...entryData } = data;

        if (isEdit && initialData) {
          await handleUpdate(initialData.id, { ...entryData, regular: true });
        } else {
          await handleCreate({ ...entryData, regular: true });
        }
        showToast({
          title: 'Успішно',
          description: isEdit ? 'Картку успішно оновлено' : 'Картку успішно створено',
          variant: 'success',
        });
        onSuccess?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Невідома помилка';
        showToast({
          title: `Помилка: ${message}`,
          description: 'Під час збереження виникла помилка',
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
