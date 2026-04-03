'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function UiComboboxTrigger({ className, children, ...props }: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={className}
      {...props}
    >
      {children}

      <UiSvgIcon
        data-slot="combobox-trigger-icon"
        className="pointer-events-none"
        name="chevron-down"
        size="default"
      />
    </ComboboxPrimitive.Trigger>
  );
}
