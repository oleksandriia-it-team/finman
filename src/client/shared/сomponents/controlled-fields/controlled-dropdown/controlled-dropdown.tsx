import { Controller, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import Dropdown from '../../fields/dropdown/dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';

export default function ControlledDropdown<T>({ name, className, ...props }: ControlledDropdownProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const classes = clsx(className, fieldState.invalid && 'p-invalid');

        return (
          <div className="flex flex-col w-full">
            <Dropdown
              {...props}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className={classes}
              id={field.name}
            />
            {fieldState.error && <p className="error-text">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
