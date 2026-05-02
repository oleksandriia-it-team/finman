'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import { z } from 'zod';
import { TypeEntry } from '@common/enums/entry.enum';
import { AllCategoryValues } from '@common/enums/categories.enum';

const TrackingOperationFilterSchema = z
  .object({
    dateFrom: z.coerce.date().optional(),
    dateTo: z.coerce.date().optional(),
    category: z.enum(AllCategoryValues).optional(),
    type: z.enum([TypeEntry.Income, TypeEntry.Expense]).optional(),
    search: z.string().optional(),
    start: z.number().optional(),
    end: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dateFrom && data.dateTo && data.dateFrom > data.dateTo) {
      ctx.addIssue({
        code: 'custom',
        path: ['dateTo'],
        message: 'dateTo має бути більшим або рівним dateFrom',
      });
    }
    if (data.start !== undefined && data.end !== undefined && data.start > data.end) {
      ctx.addIssue({
        code: 'custom',
        path: ['end'],
        message: 'Максимальна сума має бути більшою або рівною мінімальній',
      });
    }
  });

export type TrackingOperationFilterFormData = z.infer<typeof TrackingOperationFilterSchema>;

export interface UseFiltersHookOptions {
  onApply?: (filters: Partial<TrackingOperationFilter>) => Promise<void> | void;
}

export function useFiltersHook(options?: UseFiltersHookOptions): {
  methods: ReturnType<typeof useForm<TrackingOperationFilterFormData>>;
  handleApplyFilters: () => void;
} {
  const showToast = useGlobalToast((state) => state.showToast);

  const methods = useForm<TrackingOperationFilterFormData>({
    resolver: zodResolver(TrackingOperationFilterSchema) as never,
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      category: undefined,
      type: undefined,
      search: undefined,
      start: 0,
      end: 50000,
    } as never,
  });

  const handleApplyFilters = methods.handleSubmit(
    async (data: TrackingOperationFilterFormData) => {
      try {
        const filters: Partial<TrackingOperationFilter> = {
          softDeleted: 0,
        };

        if (data.dateFrom !== undefined) filters.dateFrom = data.dateFrom;
        if (data.dateTo !== undefined) filters.dateTo = data.dateTo;
        if (data.category !== undefined) filters.category = data.category;
        if (data.type !== undefined) filters.type = data.type;
        if (data.search !== undefined) filters.search = data.search;
        if (data.start !== undefined) filters.minSum = data.start;
        if (data.end !== undefined) filters.maxSum = data.end;

        await options?.onApply?.(filters);
        showToast({
          title: 'Успішно',
          description: 'Фільтри застосовано',
          variant: 'success',
        });
      } catch (err) {
        console.log(err);
        const message = err instanceof Error ? err.message : 'Невідома помилка';
        showToast({
          title: `Помилка: ${message}`,
          description: 'Під час застосування фільтрів виникла помилка',
          variant: 'destructive',
        });
      }
    },
    (errors) => {
      console.log(errors);
      showToast({
        title: 'Перевірте правильність заповнення фільтрів',
        description: 'Фільтри заповнені некоректно',
        variant: 'destructive',
      });
    },
  );

  return { methods, handleApplyFilters };
}
