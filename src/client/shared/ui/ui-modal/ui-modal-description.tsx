import { cn } from '@frontend/shared/utils/cn.util';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';

export function UiModalDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
