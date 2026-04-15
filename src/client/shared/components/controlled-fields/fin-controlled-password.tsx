import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { Controller, useFormContext } from 'react-hook-form';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { useState } from 'react';
import { type ControlledInputProps } from '@frontend/components/controlled-fields/props/controlled-input.props';

export function FinControlledPassword({
  name,
  className,
  showErrors = true,
  label,
  id,
  ...props
}: Omit<ControlledInputProps, 'type'>) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}

            <div className="relative">
              <UiInput
                {...props}
                {...field}
                type={showPassword ? 'text' : 'password'}
                data-invalid={fieldState.invalid}
                onBlur={() => {
                  field.onBlur();
                  field.onChange(field.value);
                }}
                id={id}
                className={className}
                value={field.value ?? ''}
                onChange={(value) => field.onChange(value)}
              />

              <UiIconButton
                borderNone
                icon={showPassword ? 'eye-slash' : 'eye'}
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
                variant="muted-foreground"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground"
                title={showPassword ? 'Приховати' : 'Показати'}
              />
            </div>

            {showErrors && <UiFieldError fieldState={fieldState} />}
          </UiField>
        );
      }}
    />
  );
}
