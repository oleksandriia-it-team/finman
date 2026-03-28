import { Popover as PopoverPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { ComponentProps } from 'react';

import './styles/ui-popover-content-styles.scss';

export function UiPopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn('popover-content', className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
