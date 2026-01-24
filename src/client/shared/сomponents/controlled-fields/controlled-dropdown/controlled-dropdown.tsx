import { ControlledDropdownProps } from '../models/controlled-dropdown.model';
import { Controller, useFormContext } from 'react-hook-form';
import Dropdown from '../../fields/dropdown/dropdown';
import clsx from 'clsx';

export default function ControlledDropdown<T>({ name, className, ...props }: ControlledDropdownProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const classes = clsx(className, fieldState.invalid && 'p-invalid');

        return (
          <div className="flex flex-col items-center justify-center">
            <Dropdown<T>
              className={classes}
              {...props}
              value={field.value}
              onChange={(value) => field.onChange(value)}
            />
            {fieldState.error && <p className="error-text">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
