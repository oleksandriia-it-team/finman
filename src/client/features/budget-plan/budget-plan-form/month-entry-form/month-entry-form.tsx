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
import { usePriorityOptions } from '@frontend/shared/i18n/use-priority.hook';
import { useTranslations } from 'next-intl';

interface MonthEntryFormProps {
  initialData?: MonthEntry;
  onSuccess?: (data: MonthEntry) => void;
  onCancel?: () => void;
}

export function MonthEntryForm({ initialData, onSuccess, onCancel }: MonthEntryFormProps) {
  const { methods, submit, isEdit } = useMonthEntryForm(initialData, onSuccess);
  const t = useTranslations('budgetPlan.form');
  const priorityOptions = usePriorityOptions();

  const selectedType = methods.watch('type');

  return (
    <div className="flex flex-row size-full">
      <FormProvider {...methods}>
        <CardsFormTemplate submit={submit}>
          <CardsFormHeaderTemplate
            isEdit={isEdit}
            title={t('monthEntryTitle')}
            description={t('monthEntryDescription')}
            subjectLabel={{ create: t('monthEntrySubjectCreate'), edit: t('monthEntrySubjectEdit') }}
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
              label={t('priorityLabel')}
              name="priority"
              placeholder={t('priorityPlaceholder')}
              options={priorityOptions}
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
