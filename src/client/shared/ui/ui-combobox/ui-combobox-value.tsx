'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';

export function UiComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return (
    <ComboboxPrimitive.Value
      data-slot="combobox-value"
      {...props}
    />
  );
}
