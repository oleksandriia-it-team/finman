import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { ControlledInputProps } from '../props/controlled-input.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiField } from '@frontend/ui/ui-field/ui-field';

export function FinControlledInput({ name, className, showErrors = true, label, id, ...props }: ControlledInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}

            <UiInput
              {...props}
              {...field}
              onBlur={() => {
                field.onBlur();
                field.onChange(field.value);
              }}
              id={id}
              className={className}
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value)}
            />

            {showErrors && <UiFieldError fieldState={fieldState} />}
          </UiField>
        );
      }}
    />
  );
}
