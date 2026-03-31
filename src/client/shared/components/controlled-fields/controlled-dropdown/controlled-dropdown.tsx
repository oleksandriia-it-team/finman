import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from '../../fields/dropdown/dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';
import { cn } from '../../../utils/cn.util';

export default function ControlledDropdown<T>({
  name,
  className,
  inputClassName,
  ...props
}: ControlledDropdownProps<T>) {
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
            <Dropdown
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
