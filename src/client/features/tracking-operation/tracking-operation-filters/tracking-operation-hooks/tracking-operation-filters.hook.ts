'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import {
  type TrackingOperationFilterFormData,
  TrackingOperationFilterSchema,
} from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import { useMemo, useState } from 'react';
import constate from 'constate';
import { type TypeEntry, TypeEntryFilter } from '@common/enums/entry.enum';
import { useTranslations } from 'next-intl';

function useFiltersHookLogic() {
  const t = useTranslations('tracking.filters');
  const [filters, setFilters] = useState<Partial<TrackingOperationFilter>>({});
  const [realMaxSum, setRealMaxSum] = useState<number>(50000);

  const [typeFilter, setTypeFilter] = useState<TypeEntryFilter>(TypeEntryFilter.All);

  const showToast = useGlobalToast((state) => state.showToast);
  const methods = useForm<TrackingOperationFilterFormData>({
    resolver: zodResolver(TrackingOperationFilterSchema) as never,
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
          Object.entries(data).filter(([key, v]) => {
            if (key === 'minSum') return (v as number) > 0;
            if (key === 'maxSum') return (v as number) < realMaxSum;
            if (Array.isArray(v)) return v.length > 0;
            return v !== undefined && v !== '';
          }),
        ) as TrackingOperationFilter;

        setFilters(cleanFilters);

        showToast({
          title: t('successTitle'),
          description: t('successDescription'),
          variant: 'success',
        });
      } catch (err) {
        console.error(err);
        showToast({
          title: t('errorTitle'),
          description: t('errorDescription'),
          variant: 'destructive',
        });
      }
    },
    (errors) => {
      console.error('Validation errors:', errors);
      showToast({
        title: t('validationErrorTitle'),
        description: t('validationErrorDescription'),
        variant: 'destructive',
      });
    },
  );

  const combinedFilters = useMemo(
    () => ({
      ...filters,
      type: (typeFilter === TypeEntryFilter.All ? undefined : typeFilter) as unknown as
        | TypeEntry.Expense
        | TypeEntry.Income,
    }),
    [filters, typeFilter],
  );

  const filtersJSON = useMemo(() => JSON.stringify(combinedFilters), [combinedFilters]);

  const clearSearch = () => {
    setFilters((prev) => {
      const { search, ...rest } = prev;
      return rest;
    });
  };

  const applySearch = (value: string) => {
    setFilters((prev) => {
      if (!value) {
        const { search, ...rest } = prev;
        return rest;
      }
      return { ...prev, search: value };
    });
  };

  return {
    methods,
    filters: combinedFilters,
    handleApplyFilters,
    filtersJSON,
    typeFilter,
    setTypeFilter,
    setRealMaxSum,
    clearSearch,
    applySearch,
  };
}

export const [TrackingOperationFiltersProvider, useTrackingOperationFilters] = constate(useFiltersHookLogic);
