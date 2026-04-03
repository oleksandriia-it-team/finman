import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

export function UiModalTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...props}
    />
  );
}
