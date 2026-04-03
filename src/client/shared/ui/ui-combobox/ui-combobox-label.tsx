'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/combobox-label-styles.scss';

export function UiComboboxLabel({
  className,
  variant = 'muted',
  ...props
}: ComboboxPrimitive.GroupLabel.Props & { variant?: 'destructive' | 'muted' }) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-variant={variant}
      data-slot="combobox-label"
      className={cn('combobox-label', className)}
      {...props}
    />
  );
}
