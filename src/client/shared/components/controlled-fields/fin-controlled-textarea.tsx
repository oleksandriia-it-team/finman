import { type ControlledTextareaProps } from './props/controlled-input.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { UiTextarea } from '@frontend/ui/ui-textarea/ui-textarea';

export function FinControlledTextarea({
  name,
  className,
  showErrors = true,
  label,
  id,
  ...props
}: ControlledTextareaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}

            <UiTextarea
              {...props}
              {...field}
              ref={field.ref}
              data-invalid={fieldState.invalid}
              onBlur={() => {
                field.onBlur();
                field.onChange(field.value);
              }}
              id={id}
              onChange={(value) => field.onChange(value)}
              className={className}
              value={field.value ?? ''}
            />

            {showErrors && <UiFieldError fieldState={fieldState} />}
          </UiField>
        );
      }}
    />
  );
}
