'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { FinControlledDatepicker } from '@frontend/components/controlled-fields/fin-controlled-datepicker';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';
import { useEffect, useMemo } from 'react';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { useTranslations } from 'next-intl';

interface ErrorLogsFiltersProps {
  filters: Partial<ErrorLogFilter>;
  onChange: (newFilters: Partial<ErrorLogFilter>) => void;
}

interface FilterFormValues {
  endpoint: string;
  method: string | undefined;
  dateRange: { from?: Date; to?: Date } | undefined;
}

export function ErrorLogsFilters({ filters, onChange }: ErrorLogsFiltersProps) {
  const t = useTranslations('admin.errorLog');

  const methodOptions = useMemo(
    () => [
      { value: undefined, label: t('allMethods') },
      { value: 'GET', label: 'GET' },
      { value: 'POST', label: 'POST' },
      { value: 'PUT', label: 'PUT' },
      { value: 'PATCH', label: 'PATCH' },
      { value: 'DELETE', label: 'DELETE' },
    ],
    [t],
  );

  const defaultDateRange = useMemo(() => {
    if (filters.dateFrom || filters.dateTo) {
      const range: { from?: Date; to?: Date } = {};

      if (filters.dateFrom) {
        range.from = typeof filters.dateFrom === 'string' ? new Date(filters.dateFrom) : filters.dateFrom;
      }

      if (filters.dateTo) {
        range.to = typeof filters.dateTo === 'string' ? new Date(filters.dateTo) : filters.dateTo;
      }

      return range;
    }

    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 7);
    return { from, to };
  }, [filters.dateFrom, filters.dateTo]);

  const methods = useForm<FilterFormValues>({
    defaultValues: {
      endpoint: filters.endpoint || '',
      method: filters.method,
      dateRange: defaultDateRange,
    },
  });

  const { watch } = methods;
  const formValues = watch();

  useEffect(() => {
    const handler = setTimeout(() => {
      const updatedFilters: Partial<ErrorLogFilter> = {};
      if (filters.status !== undefined) {
        updatedFilters.status = filters.status;
      }

      if (formValues.endpoint) updatedFilters.endpoint = formValues.endpoint;
      if (formValues.method) updatedFilters.method = formValues.method;
      if (formValues.dateRange?.from) updatedFilters.dateFrom = formValues.dateRange.from;
      if (formValues.dateRange?.to) updatedFilters.dateTo = formValues.dateRange.to;

      const isChanged =
        updatedFilters.status !== filters.status ||
        updatedFilters.endpoint !== filters.endpoint ||
        updatedFilters.method !== filters.method ||
        (updatedFilters.dateFrom ? new Date(updatedFilters.dateFrom).getTime() : undefined) !==
          (filters.dateFrom ? new Date(filters.dateFrom).getTime() : undefined) ||
        (updatedFilters.dateTo ? new Date(updatedFilters.dateTo).getTime() : undefined) !==
          (filters.dateTo ? new Date(filters.dateTo).getTime() : undefined);

      if (isChanged) {
        onChange(updatedFilters);
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [
    formValues.endpoint,
    formValues.method,
    formValues.dateRange,
    filters.status,
    filters.endpoint,
    filters.method,
    filters.dateFrom,
    filters.dateTo,
    onChange,
  ]);

  return (
    <FormProvider {...methods}>
      <form className="flex flex-wrap items-center gap-4 w-full">
        <div className="relative flex-1 min-w-[250px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
            <UiSvgIcon
              name="search"
              size="sm"
              className="text-muted-foreground"
            />
          </div>

          <FinControlledInput
            name="endpoint"
            placeholder={t('filterSearchPlaceholder')}
            className="!pl-9 bg-background w-full"
            showErrors={false}
          />
        </div>

        <div className="w-[180px]">
          <FinControlledDropdown
            name="method"
            id="method-filter"
            options={methodOptions}
            placeholder={t('filterMethodPlaceholder')}
            clearable={false}
          />
        </div>

        <div className="w-[280px]">
          <FinControlledDatepicker
            name="dateRange"
            mode="range"
            placeholder={t('filterDatePlaceholder')}
            clearable={false}
          />
        </div>
      </form>
    </FormProvider>
  );
}
