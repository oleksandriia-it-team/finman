'use client';

import { ControlledInputProps } from '../props/controlled-input.props';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import Input from '@frontend/components/fields/input/input';

// TODO update later
export default function ControlledInput({ name, className, ...props }: ControlledInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const classes = clsx(className, 'form-control');
        return (
          <div className="flex flex-col items-center justify-center">
            <Input
              {...props}
              className={classes}
              value={field.value ?? ''}
              onChange={(value) => field.onChange(value)}
            />
            {fieldState.error && <p className="error-text">{fieldState.error.message}</p>}
          </div>
        );
      }}
    />
  );
}
