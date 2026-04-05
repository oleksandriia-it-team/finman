'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';
import { ComboboxMultipleInputProps } from '@frontend/ui/ui-combobox/props/combobox-input.props';

import './styles/combobox-chips-input-styles.scss';

export function UiComboboxChipsInput({ className, ...props }: ComboboxMultipleInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn('combobox-chip-input', className)}
      {...props}
    />
  );
}
