import { FormProvider } from 'react-hook-form';
import {
  CardsFormHeaderTemplate,
  CardsFormTemplate,
  CardsFormTemplateActions,
  CardsFormTemplateInputs,
  CardsFormTemplatePickers,
} from '@frontend/entities/operations/cards-form-template/cards-form-template';
import { useTrackingOperationForm } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operation-form.hook';
import { CardCreationFormSideBlock } from '@frontend/features/regular-incomes-expenses/card-creation-form/cards-form-side-block/form-side-block';
import type { TrackingOperationsFormProps } from '@frontend/features/tracking-operation/tracking-creation-form/props/tracking-operations-form-props';
import { FinControlledDatepicker } from '@frontend/components/controlled-fields/fin-controlled-datepicker';
import { useMemo } from 'react';
import { AttachStateProvider } from '@frontend/features/tracking-operation/attach/hooks/attach-state.context';
import { TrackingOperationAttachedOperationLabel } from '@frontend/features/tracking-operation/attach/attached-operation';

export function TrackingOperationForm({ initialData, onSuccess, onCancel }: TrackingOperationsFormProps) {
  const { methods, submit, isEdit } = useTrackingOperationForm(initialData, onSuccess);

  const selectedType = methods.watch('type');

  const now = useMemo(() => new Date(), []);

  const date = methods.watch('date');

  return (
    <div className="flex flex-row size-full">
      <FormProvider {...methods}>
        <CardsFormTemplate submit={submit}>
          <div className="flex justify-between gap-2 items-center">
            <CardsFormHeaderTemplate
              isEdit={isEdit}
              title={'Деталі платежу'}
              description={'Заповніть інформацію про: '}
            />

            {!!date && (
              <AttachStateProvider>
                <TrackingOperationAttachedOperationLabel />
              </AttachStateProvider>
            )}
          </div>

          <CardsFormTemplatePickers
            selectedType={selectedType}
            setValue={(value) => {
              methods.setValue('category', undefined as never, { shouldValidate: true });
              methods.setValue('type', value, { shouldValidate: true });
            }}
          />
          <CardsFormTemplateInputs>
            <FinControlledDatepicker
              clearable={false}
              mode={'single'}
              name="date"
              maxDate={now}
              label="Дата операції"
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
