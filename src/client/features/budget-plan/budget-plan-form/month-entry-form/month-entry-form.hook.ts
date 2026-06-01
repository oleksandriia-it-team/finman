import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MonthEntrySchema } from '@common/domains/month-entry/month-entry.schema';
import type { MonthEntry } from '@common/records/month-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';

export function useMonthEntryForm(initialData?: MonthEntry, onSuccess?: (data: MonthEntry) => void) {
  const isEdit = !!initialData;

  const methods = useForm<MonthEntry>({
    resolver: zodResolver(MonthEntrySchema) as never,
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      type: initialData?.type ?? TypeEntry.Expense,
      category: initialData?.category,
      sum: initialData?.sum ?? 0,
      selected: initialData?.selected ?? true,
      priority: initialData?.priority ?? 5,
    } as never,
  });

  const submit = methods.handleSubmit((data: MonthEntry) => {
    onSuccess?.(data);
  });

  return { methods, submit, isEdit };
}
