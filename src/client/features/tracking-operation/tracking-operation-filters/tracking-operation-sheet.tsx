'use client';

import { CategoryFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-category-filters';
import { PeriodFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-period-filter';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { SumFilter } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-sum-filter';
import { FormProvider } from 'react-hook-form';
import { CardsFormTemplateActions } from '@frontend/entities/operations/cards-form-template/cards-form-template';
import { UiResponsiveDialog } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog';
import { UiResponsiveDialogHeader } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-header';
import { UiResponsiveDialogContent } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-content';
import { UiResponsiveDialogTrigger } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-trigger';
import { UiResponsiveDialogTitle } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-title';
import { UiResponsiveDialogClose } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-close';
import { TrackingOperationDatepicker } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-datepicker';
import { UiResponsiveDialogFooter } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-footer';
import { useFiltersHook } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/use-filters.hook';
import type { FiltersSheetProps } from '@frontend/features/tracking-operation/tracking-operation-filters/props/filter-sheet.props';
import { useTrackingOperations } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';
import { useEffect, useState } from 'react';

export function FiltersSheet({ children, onApply }: FiltersSheetProps) {
  const { getMaxItem } = useTrackingOperations();
  const [maxItem, setMaxItem] = useState(100000);
  const { methods, handleApplyFilters } = useFiltersHook({ onApply } as never, maxItem);

  useEffect(() => {
    getMaxItem().then((res) => {
      if (res) {
        setMaxItem(res);
        methods.setValue('maxSum', res);
      }
    });
  }, [getMaxItem, methods]);

  return (
    <FormProvider {...methods}>
      <UiResponsiveDialog>
        <UiResponsiveDialogTrigger
          asChild
          className="size-full"
        >
          {children}
        </UiResponsiveDialogTrigger>
        <UiResponsiveDialogContent className="flex flex-col w-full rounded-t-[2rem]">
          <UiResponsiveDialogHeader className="flex flex-row justify-between">
            <UiResponsiveDialogTitle className="text-xl">Фільтри</UiResponsiveDialogTitle>
            <UiResponsiveDialogClose />
          </UiResponsiveDialogHeader>
          <form
            onSubmit={handleApplyFilters}
            className="flex flex-col size-full gap-3"
          >
            <PeriodFilters className="flex-1" />

            <UiSeparator className="w-full" />

            <TrackingOperationDatepicker />

            <UiSeparator className="w-full" />

            <CategoryFilters className="flex-1" />

            <UiSeparator className="w-full" />

            <SumFilter
              maxItem={maxItem}
              className="flex-1"
            />

            <UiResponsiveDialogFooter>
              <CardsFormTemplateActions
                cancelButtonLabel="Скинути"
                onCancel={() =>
                  methods.reset({
                    dateFrom: undefined,
                    dateTo: undefined,
                    category: undefined,
                    type: undefined,
                    search: '',
                    softDeleted: 0,
                    minSum: 0,
                    maxSum: maxItem,
                  })
                }
              />
            </UiResponsiveDialogFooter>
          </form>
        </UiResponsiveDialogContent>
      </UiResponsiveDialog>
    </FormProvider>
  );
}
