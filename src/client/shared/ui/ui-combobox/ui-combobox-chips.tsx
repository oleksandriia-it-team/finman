'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/combobox-chips-styles.scss';
import { type ComboboxMultipleChips } from '@frontend/ui/ui-combobox/props/combobox-input.props';

export function UiComboboxChips({ className, 'data-invalid': dataInvalid, ...props }: ComboboxMultipleChips) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      data-invalid={dataInvalid}
      className={cn('combobox-chips basic-input min-h-9 !h-full', className)}
      {...props}
    />
  );
}
