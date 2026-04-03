'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiTextarea } from '@frontend/ui/ui-textarea/ui-textarea';

import './styles/input-group-textarea-styles.scss';

export function UiInputGroupTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <UiTextarea
      data-slot="input-group-control"
      className={cn('input-group-control input-group-textarea', className)}
      {...props}
    />
  );
}
