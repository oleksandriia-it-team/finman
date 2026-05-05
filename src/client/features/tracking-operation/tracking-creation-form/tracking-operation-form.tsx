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
import type { TrackingOperationsFormProps } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operations-form-props';

export function TrackingOperationForm({ initialData, onSuccess, onCancel }: TrackingOperationsFormProps) {
  const { methods, submit, isEdit } = useTrackingOperationForm(initialData, onSuccess);

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
          <CardsFormTemplateInputs />
          <CardsFormTemplateActions onCancel={onCancel as never} />
        </CardsFormTemplate>
      </FormProvider>

      <div className="size-full flex-2 max-lg:hidden">
        <CardCreationFormSideBlock />
      </div>
    </div>
  );
}
