'use client';

import { ControlledInputProps } from '../props/controlled-input.props';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import Input from '../../fields/input/input';

// TODO update later
export default function ControlledInput({ name, className, inputClassName, ...props }: ControlledInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const inputClasses = clsx(inputClassName, fieldState.invalid && 'is-invalid');
        const wrapperClasses = clsx(className, 'flex flex-col items-center justify-center');
        return (
          <div className={wrapperClasses}>
            <Input
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
