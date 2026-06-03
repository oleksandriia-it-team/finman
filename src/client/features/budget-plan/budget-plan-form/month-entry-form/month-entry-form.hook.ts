'use client';

import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMonthEntrySchema } from '@common/domains/month-entry/month-entry.schema';
import type { MonthEntry } from '@common/records/month-entry.record';
import { TypeEntry } from '@common/enums/entry.enum';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { useTranslations } from 'next-intl';

export function useMonthEntryForm(initialData?: MonthEntry, onSuccess?: (data: MonthEntry) => void) {
  const isEdit = !!initialData;
  const tEV = useTranslations('entry.validation');
  const tBV = useTranslations('budgetPlan.validation');

  const schema = useMemo(
    () =>
      createMonthEntrySchema({
        titleRequired: tEV('titleRequired'),
        titleMaxLength: tEV('titleMaxLength', { max: MonthEntryRequirements.MaxTitleLength }),
        descriptionMaxLength: tEV('descriptionMaxLength', { max: MonthEntryRequirements.MaxDescriptionLength }),
        sumRequired: tEV('sumRequired'),
        sumMin: tEV('sumMin', { min: MonthEntryRequirements.MinSumValue }),
        incomeCategoryInvalid: tEV('incomeCategoryInvalid'),
        expenseCategoryInvalid: tEV('expenseCategoryInvalid'),
        selectedBoolean: tBV('selectedBoolean'),
        priorityInteger: tBV('priorityInteger'),
        priorityMin: tBV('priorityMin'),
        priorityMax: tBV('priorityMax'),
        idInteger: tBV('idInteger'),
        idMin: tBV('idMin'),
      }),
    [tEV, tBV],
  );

  const methods = useForm<MonthEntry>({
    resolver: zodResolver(schema) as never,
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
