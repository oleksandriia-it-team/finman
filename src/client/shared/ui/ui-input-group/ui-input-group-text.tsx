'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/input-group-text-styles.scss';

export function UiInputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('input-group-text', className)}
      {...props}
    />
  );
}
