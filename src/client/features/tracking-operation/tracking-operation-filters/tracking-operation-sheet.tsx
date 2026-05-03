import { CategoryFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-category-filters';
import { PeriodFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-period-filter';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { SumFilter } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-sum-filter';
import { FormProvider, useForm } from 'react-hook-form';
import { CardsFormTemplateActions } from '@frontend/entities/operations/cards-form-template/cards-form-template';
import { UiResponsiveDialog } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog';
import { UiResponsiveDialogHeader } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-header';
import { UiResponsiveDialogContent } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-content';
import { UiResponsiveDialogTrigger } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-trigger';
import { UiResponsiveDialogTitle } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-title';
import { UiResponsiveDialogClose } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-close';
import { FinDatepicker } from '@frontend/components/datepicker/fin-datepicker';
import type { DateRange } from 'react-day-picker';
import { useState } from 'react';

interface FiltersSheet {
  children?: React.ReactNode;
}

export function FiltersSheet({ children }: FiltersSheet) {
  const methods = useForm();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  return (
    <FormProvider {...methods}>
      <form className=" flex flex-col size-full  ">
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

            <PeriodFilters className="flex-1" />

            <FinDatepicker
              placeholder="Оберіть дату"
              mode="range"
              selected={date}
              onSelect={setDate}
            />

            <UiSeparator className="w-full" />

            <CategoryFilters className="flex-1" />

            <UiSeparator className="w-full" />

            <SumFilter className="flex-1" />

            <CardsFormTemplateActions onCancel={() => console.log(1)} />
          </UiResponsiveDialogContent>
        </UiResponsiveDialog>
      </form>
    </FormProvider>
  );
}
