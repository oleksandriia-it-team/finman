import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import Dropdown from '../../fields/dropdown/dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';

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
        const inputClasses = clsx(inputClassName, fieldState.invalid && 'is-invalid');
        const wrapperClasses = clsx(className, 'flex flex-col items-center justify-center');

        console.log(inputClasses);

        return (
          <div className={wrapperClasses}>
            <Dropdown
              {...props}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className={inputClasses}
              id={field.name}
            />
            {fieldState.error && <p className="invalid-feedback">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
