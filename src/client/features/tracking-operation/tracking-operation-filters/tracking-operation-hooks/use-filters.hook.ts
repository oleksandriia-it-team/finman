'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import {
  filterSchema,
  type TrackingOperationFilterFormData,
} from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';

export interface UseFiltersHookOptions {
  onApply?: (filters: TrackingOperationFilter) => Promise<void> | void;
}

export function useFiltersHook(options?: UseFiltersHookOptions) {
  const showToast = useGlobalToast((state) => state.showToast);
  const methods = useForm<TrackingOperationFilterFormData>({
    resolver: zodResolver(filterSchema) as never,
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
      category: undefined,
      type: undefined,
      search: '',
      softDeleted: 0,
      minSum: 0,
      maxSum: 50000,
    },
  });

  const handleApplyFilters = methods.handleSubmit(
    async (data) => {
      try {
        const cleanFilters = Object.fromEntries(
          Object.entries(data).filter(([_, v]) => v !== undefined && v !== ''),
        ) as TrackingOperationFilter;

        await options?.onApply?.(cleanFilters);

        showToast({
          title: 'Успішно',
          description: 'Фільтри застосовано',
          variant: 'success',
        });
      } catch (err) {
        console.error(err);
        showToast({
          title: 'Помилка',
          description: 'Не вдалося застосувати фільтри',
          variant: 'destructive',
        });
      }
    },
    (errors) => {
      console.error('Validation errors:', errors);
      showToast({
        title: 'Помилка валідації',
        description: 'Перевірте правильність введених сум або дат',
        variant: 'destructive',
      });
    },
  );

  return { methods, handleApplyFilters };
}
