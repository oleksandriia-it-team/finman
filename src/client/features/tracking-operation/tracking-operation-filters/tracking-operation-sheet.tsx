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
import { FormProvider, useForm } from 'react-hook-form';
import { CardsFormTemplateActions } from '@frontend/entities/operations/cards-form-template/cards-form-template';
import { UiSheet } from '@frontend/ui/ui-sheet/ui-sheet';

interface FiltersSheet {
  children?: React.ReactNode;
}

export function FiltersSheet({ children }: FiltersSheet) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form className=" flex flex-col size-full  ">
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
            <PeriodFilters className="flex-1" />
            <UiSeparator className="w-full" />
            <CategoryFilters className="flex-1" />
            <UiSeparator className="w-full" />
            <SumFilter className="flex-1" />
            <CardsFormTemplateActions onCancel={() => console.log(1)} />
          </UiSheetContent>
        </UiSheet>
      </form>
    </FormProvider>
  );
}
