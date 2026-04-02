import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { ControlledInputProps } from '../props/controlled-input.props';
import { Controller, useFormContext } from 'react-hook-form';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinControlledInput({ name, wrapperClassName, className, ...props }: ControlledInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const inputClasses = cn(className, fieldState.invalid && 'is-invalid');
        const wrapperClasses = cn(wrapperClassName, 'flex flex-col');
        return (
          <div className={wrapperClasses}>
            <UiInput
              {...props}
              className={inputClasses}
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value)}
            />
            {fieldState.error && <p className="text-destructive">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
