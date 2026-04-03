'use client';

import * as React from 'react';
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/label-styles.scss';

export function UiLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn('label', className)}
      {...props}
    />
  );
}
