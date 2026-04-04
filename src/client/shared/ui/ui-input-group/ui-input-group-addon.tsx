'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export interface InputGroupAddonProps extends React.ComponentProps<'div'> {
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
}

export function UiInputGroupAddon({ className, align = 'inline-start', ...props }: InputGroupAddonProps) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn('basic-input-addons', className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return;
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus();
      }}
      {...props}
    />
  );
}
