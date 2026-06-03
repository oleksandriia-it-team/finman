'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type TrackingOperationFormData,
  createTrackingOperationSchema,
} from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { useTrackingOperations } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';
import { useTranslations } from 'next-intl';

export function useTrackingOperationForm(initialData?: TrackingOperationRecord, onSuccess?: () => void) {
  const { handleCreate, handleUpdate } = useTrackingOperations();
  const isEdit = !!initialData;
  const tTV = useTranslations('tracking.validation');

  const schema = useMemo(
    () =>
      createTrackingOperationSchema({
        titleRequired: tTV('titleRequired'),
        titleMaxLength: tTV('titleMaxLength', { max: 20 }),
        descriptionMaxLength: tTV('descriptionMaxLength', { max: 100 }),
        typeInvalid: tTV('typeInvalid'),
        dateRequired: tTV('dateRequired'),
        sumNotNumber: tTV('sumNotNumber'),
        sumMin: tTV('sumMin', { min: 1 }),
        attachedIdInteger: tTV('attachedIdInteger'),
        cannotAttachBoth: tTV('cannotAttachBoth'),
      }),
    [tTV],
  );

  const methods = useForm<TrackingOperationFormData>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description,
      type: initialData?.type ?? TypeEntry.Expense,
      category: initialData?.category,
      sum: initialData?.sum !== undefined ? Number(initialData.sum) : 0,
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      attachedPlannedRegEntryId: initialData?.attachedPlannedRegEntryId ?? null,
      attachedPlannedMonthEntryId: initialData?.attachedPlannedMonthEntryId ?? null,
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
