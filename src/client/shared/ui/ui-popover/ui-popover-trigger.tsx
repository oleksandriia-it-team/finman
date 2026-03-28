import { Popover as PopoverPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

export function UiPopoverTrigger({ ...props }: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  );
}
