import { Controller, useFormContext } from 'react-hook-form';
import { FinDropdown } from '@frontend/components/fields/fin-dropdown/fin-dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';
import { cn } from '../../../utils/cn.util';

export default function FinControlledDropdown<T>({
  name,
  wrapperClassName,
  className,
  ...props
}: ControlledDropdownProps<T>) {
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
            <FinDropdown
              {...props}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className={inputClasses}
              id={field.name}
            />
            {fieldState.error && <p className="text-destructive">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
