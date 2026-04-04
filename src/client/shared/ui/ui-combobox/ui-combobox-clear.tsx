'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function UiComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
    >
      <UiSvgIcon
        name="x"
        variant="default"
        className="pointer-events-none"
        size="xs"
      />
    </ComboboxPrimitive.Clear>
  );
}
