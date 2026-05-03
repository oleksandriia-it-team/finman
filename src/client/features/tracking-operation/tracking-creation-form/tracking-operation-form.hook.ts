'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TrackingOperationFormSchema,
  type TrackingOperationFormData,
} from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { useTrackingOperations } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';

export function useTrackingOperationForm(initialData?: TrackingOperationRecord, onSuccess?: () => void) {
  const { handleCreate, handleUpdate } = useTrackingOperations();
  const isEdit = !!initialData;

  const methods = useForm<TrackingOperationFormData>({
    resolver: zodResolver(TrackingOperationFormSchema) as never,
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? 'Немає опису',
      type: initialData?.type ?? TypeEntry.Expense,
      category: initialData?.category,
      sum: Number(initialData?.sum) ?? 0,
      date: initialData?.date ? new Date(initialData.date) : new Date(),
    } as never,
  });

  const submit = methods.handleSubmit(async (data) => {
    try {
      if (isEdit && initialData) {
        await handleUpdate(initialData.id, {
          ...data,
          id: initialData.id,
        } as never);
      } else {
        await handleCreate(data as never);
      }
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  });

  return { methods, submit, isEdit };
}
