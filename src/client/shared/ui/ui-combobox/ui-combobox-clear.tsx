'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function UiComboboxClear({
  className,
  'aria-label': ariaLabel = 'Очистити поле',
  ...props
}: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      tabIndex={0}
      aria-label={ariaLabel}
      {...props}
      render={<button />}
    >
      <UiSvgIcon
        aria-hidden
        name="x"
        className="pointer-events-none"
      />
    </ComboboxPrimitive.Clear>
  );
}
