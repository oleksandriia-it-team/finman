import { Dialog as DialogPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

export function UiModal({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return (
    <DialogPrimitive.Root
      data-slot="dialog"
      {...props}
    />
  );
}
