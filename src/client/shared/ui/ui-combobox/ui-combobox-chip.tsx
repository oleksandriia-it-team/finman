'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

import './styles/combobox-chip-styles.scss';

export function UiComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn('combobox-chip', className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={
            <UiButton
              variant="default"
              size="xs"
              isOutlined
            />
          }
          className="combobox-chip-remove"
          data-slot="combobox-chip-remove"
        >
          <UiIconButton
            icon="x"
            variant="default"
            isOutlined={false}
            size="xs"
          />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}
