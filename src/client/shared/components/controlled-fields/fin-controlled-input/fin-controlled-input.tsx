import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { ControlledInputProps } from '../props/controlled-input.props';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinControlledInput({ name, className, ...props }: ControlledInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const inputClasses = cn(fieldState.invalid && 'is-invalid');
        const wrapperClasses = cn(className, 'flex flex-col items-center justify-center');
        return (
          <div className={wrapperClasses}>
            <UiInput
              {...props}
              className={inputClasses}
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value)}
            />
            {fieldState.error && <p className="invalid-feedback">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
