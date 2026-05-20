'use client';

import { FormProvider } from 'react-hook-form';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import {
  CardsFormHeaderTemplate,
  CardsFormTemplate,
  CardsFormTemplateActions,
  CardsFormTemplateInputs,
  CardsFormTemplatePickers,
} from '@frontend/entities/operations/cards-form-template/cards-form-template';
import { CardCreationFormSideBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/form-side-block';
import type { MonthEntry } from '@common/records/month-entry.record';
import { useMonthEntryForm } from '@frontend/features/budget-plan/budget-plan-form/month-entry-form/month-entry-form.hook';
import { PriorityOptions } from '@common/enums/priority.enum';

interface MonthEntryFormProps {
  initialData?: MonthEntry;
  onSuccess?: (data: MonthEntry) => void;
  onCancel?: () => void;
}

export function MonthEntryForm({ initialData, onSuccess, onCancel }: MonthEntryFormProps) {
  const { methods, submit, isEdit } = useMonthEntryForm(initialData, onSuccess);

  const selectedType = methods.watch('type');

  return (
    <div className="flex flex-row size-full">
      <FormProvider {...methods}>
        <CardsFormTemplate submit={submit}>
          <CardsFormHeaderTemplate
            isEdit={isEdit}
            title="Деталі операції"
            description="Заповніть інформацію про: "
          />
          <CardsFormTemplatePickers
            selectedType={selectedType}
            setValue={(value) => {
              methods.setValue('category', undefined as never, { shouldValidate: true });
              methods.setValue('type', value, { shouldValidate: true });
            }}
          />
          <CardsFormTemplateInputs>
            <FinControlledDropdown
              label="Пріоритет"
              name="priority"
              placeholder="Оберіть пріоритет"
              options={PriorityOptions}
            />
          </CardsFormTemplateInputs>
          <CardsFormTemplateActions onCancel={onCancel as never} />
        </CardsFormTemplate>
      </FormProvider>

      <div className="size-full flex-2 max-lg:hidden">
        <CardCreationFormSideBlock />
      </div>
    </div>
  );
}
