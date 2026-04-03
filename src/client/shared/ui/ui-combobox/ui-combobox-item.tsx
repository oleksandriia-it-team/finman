'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/combobox-item-styles.scss';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function UiComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn('combobox-item', className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        data-slot="combobox-item-indicator"
        className="combobox-item-indicator"
        render={<span />}
      >
        <UiSvgIcon
          name="check2"
          size="default"
        />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}
