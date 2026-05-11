import { FormProvider } from 'react-hook-form';
import { DayOfMonthOptions, FrequencyOptions } from '@frontend/shared/constants/regular-options.constant';
import { useRegularPaymentForm } from './regular-form.hook';
import { CardCreationFormSideBlock } from './cards-form-side-block/form-side-block';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import type { RegularPaymentFormProps } from '@frontend/shared/props/regular-form-props';
import {
  CardsFormHeaderTemplate,
  CardsFormTemplate,
  CardsFormTemplateActions,
  CardsFormTemplateInputs,
  CardsFormTemplatePickers,
} from '@frontend/entities/operations/cards-form-template/cards-form-template';

export function RegularPaymentForm({ initialData, onSuccess, onCancel }: RegularPaymentFormProps) {
  const { methods, submit, isEdit } = useRegularPaymentForm(initialData, onSuccess);

  const selectedType = methods.watch('type');

  return (
    <div className="flex flex-row size-full">
      <FormProvider {...methods}>
        <CardsFormTemplate submit={submit}>
          <CardsFormHeaderTemplate
            isEdit={isEdit}
            title={'Деталі платежу'}
            description={'Заповніть інформацію про: '}
          />
          <CardsFormTemplatePickers
            selectedType={selectedType}
            setValue={(value) => {
              methods.setValue('category', undefined as never, { shouldValidate: true });
              methods.setValue('type', value, { shouldValidate: true });
            }}
          />
          <CardsFormTemplateInputs>
            <UiFormLayout.Grid>
              <FinControlledDropdown
                label="Частота"
                name="frequency"
                placeholder="Оберіть частоту"
                options={FrequencyOptions}
              />
              <FinControlledDropdown
                label="День"
                name="dayOfMonth"
                placeholder="День"
                options={DayOfMonthOptions}
              />
            </UiFormLayout.Grid>
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
