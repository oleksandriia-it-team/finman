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
import { useTrackingOperationFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { useEffect, useMemo, useState } from 'react';
import { useGetBasicTrackingInformation } from './tracking-operation-hooks/get-tracking-op-information.hook';
import { useTranslations } from 'next-intl';

export function FiltersSheet({ children }: ChildrenComponentProps) {
  const t = useTranslations('tracking.filters');
  const { methods, handleApplyFilters, setRealMaxSum } = useTrackingOperationFilters();

  const [open, setOpen] = useState(false);

  const { data } = useGetBasicTrackingInformation();

  const maxSum = useMemo(() => Math.max(data?.maxSum ?? 50000, 50000), [data]);

  const maxSumInFilters = methods.watch('maxSum') ?? 0;

  useEffect(() => {
    setRealMaxSum(maxSum);
  }, [maxSum, setRealMaxSum]);

  useEffect(() => {
    if (maxSum < maxSumInFilters) {
      methods.setValue('maxSum', maxSum);
    }
  }, [maxSum, maxSumInFilters, methods]);

  return (
    <FormProvider {...methods}>
      <UiResponsiveDialog
        open={open}
        openChange={setOpen}
      >
        <UiResponsiveDialogTrigger
          asChild
          className="size-full"
        >
          {children}
        </UiResponsiveDialogTrigger>
        <UiResponsiveDialogContent className="flex flex-col w-full rounded-t-[2rem]">
          <UiResponsiveDialogHeader className="flex flex-row justify-between">
            <UiResponsiveDialogTitle className="text-xl">{t('title')}</UiResponsiveDialogTitle>
            <UiResponsiveDialogClose />
          </UiResponsiveDialogHeader>
          <form
            onSubmit={(e) => {
              handleApplyFilters(e);
              setOpen(false);
            }}
            className="flex flex-col size-full gap-3"
          >
            <PeriodFilters className="flex-1" />

            <UiSeparator className="w-full" />

            <TrackingOperationDatepicker />

            <UiSeparator className="w-full" />

            <CategoryFilters className="flex-1" />

            <UiSeparator className="w-full" />

            <SumFilter
              maxItem={maxSum}
              className="flex-1"
            />

            <UiResponsiveDialogFooter>
              <CardsFormTemplateActions
                cancelButtonLabel={t('resetButton')}
                onCancel={() =>
                  methods.reset({
                    dateFrom: null as never,
                    dateTo: null as never,
                    category: undefined,
                    type: undefined,
                    search: '',
                    softDeleted: 0,
                    minSum: 0,
                    maxSum: maxSum,
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
