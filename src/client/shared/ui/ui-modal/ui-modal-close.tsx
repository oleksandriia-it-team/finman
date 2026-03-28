import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

export function UiModalClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      {...props}
    />
  );
}
