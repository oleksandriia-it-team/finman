'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={
        <UiButton
          variant="default"
          size="xs"
          isOutlined
        />
      }
      className={cn(className)}
      {...props}
    >
      <UiIconButton
        icon="x"
        variant="default"
        className="pointer-events-none"
        isOutlined={false}
        size="xs"
      />
    </ComboboxPrimitive.Clear>
  );
}
