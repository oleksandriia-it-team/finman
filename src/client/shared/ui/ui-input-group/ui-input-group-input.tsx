'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiInputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type="text"
      data-slot="input-group-control"
      className={cn('input-group-control', className)}
      {...props}
    />
  );
}
