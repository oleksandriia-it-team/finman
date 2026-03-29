import { cn } from '@frontend/shared/utils/cn.util';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

export function UiModalTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold text-foreground', className)}
      {...props}
    />
  );
}
