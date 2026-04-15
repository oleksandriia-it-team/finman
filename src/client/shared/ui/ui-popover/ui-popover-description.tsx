import { type ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiPopoverDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="popover-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
}
