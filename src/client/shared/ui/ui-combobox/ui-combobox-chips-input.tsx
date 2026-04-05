'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/combobox-chips-input-styles.scss';
import { UiComboboxTrigger } from '@frontend/ui/ui-combobox/ui-combobox-trigger';

export function UiComboboxChipsInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return (
    <div className="flex flex-1 justify-between">
      <ComboboxPrimitive.Input
        data-slot="combobox-chip-input"
        className={cn('combobox-chip-input', className)}
        {...props}
      />
      <UiComboboxTrigger data-slot="input-group-button" />
    </div>
  );
}
