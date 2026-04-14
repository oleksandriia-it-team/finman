'use client';

import { type InputProps } from '@frontend/components/fields/props/input.props';

import { cn } from '@frontend/shared/utils/cn.util';
import { type ComponentProps } from 'react';

import './styles/input-styles.scss';

export function UiInput({
  className,
  value,
  onChange,
  type = 'text',
  ...props
}: InputProps<string> & Omit<ComponentProps<'input'>, 'onChange'>) {
  return (
    <input
      data-slot="input"
      value={value ?? ''}
      type={type}
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        onChange(target.value);
      }}
      className={cn('input basic-input', className)}
      {...props}
    />
  );
}
