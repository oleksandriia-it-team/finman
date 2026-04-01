import { Controller, useFormContext } from 'react-hook-form';
import { FinDropdown } from '@frontend/components/fields/fin-dropdown/fin-dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';
import { cn } from '../../../utils/cn.util';

export function FinControlledDropdown<T>({ name, className, inputClassName, ...props }: ControlledDropdownProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const inputClasses = cn(inputClassName, fieldState.invalid && 'is-invalid');
        const wrapperClasses = cn(className, 'flex flex-col items-center justify-center');

        return (
          <div className={wrapperClasses}>
            <FinDropdown
              {...props}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className={inputClasses}
              id={field.name}
            />
            {fieldState.error && <p className="invalid-feedback d-block">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
