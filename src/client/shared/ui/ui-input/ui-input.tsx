'use client';

import { type InputProps } from '@frontend/components/fields/props/input.props';

import { cn } from '@frontend/shared/utils/cn.util';
import { type ComponentProps, useEffect, useState } from 'react';

import './styles/input-styles.scss';
import { getAfterInputValue } from '@common/utils/get-after-input-value.util';

export function UiInput({
  className,
  value,
  onChange,
  type = 'text',
  pattern,
  ref,
  ...props
}: InputProps<string> & Omit<ComponentProps<'input'>, 'onChange'>) {
  const regexp = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const value = getAfterInputValue(e as InputEvent);

      if (!regexp?.test(value)) {
        e.preventDefault();
      }
    };

    inputRef?.addEventListener('beforeinput', handler);

    return () => {
      inputRef?.removeEventListener('beforeinput', handler);
    };
  }, [inputRef, regexp]);

  return (
    <input
      data-slot="input"
      value={value ?? ''}
      type={type}
      onInput={(event) => {
        const target = event.target as HTMLInputElement;
        onChange(target.value);
      }}
      ref={(e) => {
        if (typeof ref === 'function') {
          ref(e);
        } else if (ref) {
          ref.current = e;
        }

        setInputRef(e);
      }}
      className={cn('input basic-input', className)}
      {...props}
    />
  );
}
