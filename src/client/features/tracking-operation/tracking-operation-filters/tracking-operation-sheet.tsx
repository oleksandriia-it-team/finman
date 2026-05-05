'use client';
import { CategoryFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-category-filters';
import { UiSheetContent } from '@frontend/ui/ui-sheet/ui-sheet-content';
import { UiSheetHeader } from '@frontend/ui/ui-sheet/ui-sheet-header';
import { UiSheetTitle } from '@frontend/ui/ui-sheet/ui-sheet-title';
import { UiSheetTrigger } from '@frontend/ui/ui-sheet/ui-sheet-trigger';
import { UiSheetButtonClose } from '@frontend/ui/ui-sheet/ui-sheet-button-close';
import { PeriodFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-period-filter';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { SumFilter } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-sum-filter';
import { FormProvider } from 'react-hook-form';
import { CardsFormTemplateActions } from '@frontend/entities/operations/cards-form-template/cards-form-template';
import { UiSheet } from '@frontend/ui/ui-sheet/ui-sheet';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import { useFiltersHook } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/use-filters.hook';

interface FiltersSheetProps extends ChildrenComponentProps {
  onApply?: (filters: TrackingOperationFilter) => Promise<void> | void;
}

export function FiltersSheet({ children, onApply }: FiltersSheetProps) {
  const { methods, handleApplyFilters } = useFiltersHook({ onApply } as never);

  return (
    <FormProvider {...methods}>
      <UiSheet>
        <UiSheetTrigger
          asChild
          className="size-full"
        >
          {children}
        </UiSheetTrigger>
        <UiSheetContent
          className="flex flex-col max-h-5/6 w-full rounded-t-[2rem]"
          side="bottom"
        >
          <UiSheetHeader className="flex justify-between">
            <UiSheetTitle className="text-xl">Фільтри</UiSheetTitle>
            <UiSheetButtonClose />
          </UiSheetHeader>
          <form
            onSubmit={handleApplyFilters}
            className="flex flex-col size-full gap-3"
          >
            <PeriodFilters className="flex-1" />
            <UiSeparator className="w-full" />
            <CategoryFilters className="flex-1" />
            <UiSeparator className="w-full" />
            <SumFilter className="flex-1" />
            <CardsFormTemplateActions onCancel={() => methods.reset()} />
          </form>
        </UiSheetContent>
      </UiSheet>
    </FormProvider>
  );
}
