import { Popover as PopoverPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

export function UiPopoverAnchor({ ...props }: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return (
    <PopoverPrimitive.Anchor
      data-slot="popover-anchor"
      {...props}
    />
  );
}
