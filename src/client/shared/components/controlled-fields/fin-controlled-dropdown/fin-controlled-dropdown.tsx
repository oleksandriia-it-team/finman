import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FinDropdown } from '@frontend/components/fields/fin-dropdown/fin-dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';
import { cn } from '../../../utils/cn.util';

export default function FinControlledDropdown<T>({ name, className, ...props }: ControlledDropdownProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const classes = cn(className, fieldState.invalid && 'p-invalid');

        return (
          <div className="flex flex-col w-full">
            <FinDropdown
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
