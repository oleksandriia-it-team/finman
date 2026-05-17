'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/input-group-styles.scss';

export function UiInputGroup({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="input-group"
      className={cn('input-group basic-input group/input-group', className)}
      {...props}
    />
  );
}
