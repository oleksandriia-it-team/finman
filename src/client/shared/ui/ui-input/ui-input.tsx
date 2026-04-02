'use client';

import { InputProps } from '@frontend/components/fields/props/input.props';

import { cn } from '@frontend/shared/utils/cn.util';

import './styles/input-styles.scss';

export function UiInput({ className, value, onChange, ...props }: InputProps<string>) {
  return (
    <input
      type="text"
      data-slot="input"
      value={value ?? ''}
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        onChange(target.value);
      }}
      className={cn('input basic-input', className)}
      {...props}
    />
  );
}
