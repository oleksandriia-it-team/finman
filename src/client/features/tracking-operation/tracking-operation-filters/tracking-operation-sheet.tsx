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
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import { useFiltersHook } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/use-filters.hook';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

interface FiltersSheetProps extends ChildrenComponentProps {
  onApply?: (filters: TrackingOperationFilter) => Promise<void> | void;
}

export function FiltersSheet({ children, onApply }: FiltersSheetProps) {
  const { methods, handleApplyFilters } = useFiltersHook({ onApply } as never);

  return (
    <FormProvider {...methods}>
      <UiResponsiveDialog>
        <UiResponsiveDialogTrigger
          asChild
          className="size-full"
        >
          {children}
        </UiResponsiveDialogTrigger>
        <UiResponsiveDialogContent className="flex flex-col max-h-5/6 w-full rounded-t-[2rem]">
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

            <SumFilter className="flex-1" />

            <UiResponsiveDialogFooter>
              <CardsFormTemplateActions onCancel={() => methods.reset()} />
            </UiResponsiveDialogFooter>
          </form>
        </UiResponsiveDialogContent>
      </UiResponsiveDialog>
    </FormProvider>
  );
}
