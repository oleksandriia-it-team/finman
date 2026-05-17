'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export interface InputGroupAddonProps extends React.ComponentProps<'fieldset'> {
  align?: 'inline-start' | 'inline-end' | 'block-start' | 'block-end';
}

export function UiInputGroupAddon({ className, align = 'inline-start', ...props }: InputGroupAddonProps) {
  return (
    <fieldset
      data-slot="input-group-addon"
      data-align={align}
      className={cn('basic-input-addons', className)}
      {...props}
    />
  );
}
