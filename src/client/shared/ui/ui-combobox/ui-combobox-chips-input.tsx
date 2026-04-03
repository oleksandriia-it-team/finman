'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/combobox-chips-input-styles.scss';

export function UiComboboxChipsInput({ className, children, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn('combobox-chip-input', className)}
      {...props}
    />
  );
}
