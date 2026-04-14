import { Dialog as DialogPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

export function UiModalPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return (
    <DialogPrimitive.Portal
      data-slot="dialog-portal"
      {...props}
    />
  );
}
