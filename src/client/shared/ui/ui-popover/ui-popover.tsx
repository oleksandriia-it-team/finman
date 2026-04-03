import { Popover as PopoverPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

export function UiPopover({ ...props }: ComponentProps<typeof PopoverPrimitive.Root>) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  );
}
