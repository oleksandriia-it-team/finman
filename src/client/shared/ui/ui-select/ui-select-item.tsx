import * as React from 'react';
import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '../ui-svg-icon/ui-svg-icon';

import './styles/select-item-styles.scss';

export function UiSelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn('select-item', className)}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <UiSvgIcon
            name="check2"
            size="default"
          />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}
