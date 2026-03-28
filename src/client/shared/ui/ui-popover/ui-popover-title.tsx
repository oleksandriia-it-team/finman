import { cn } from '@frontend/shared/utils/cn.util';
import { ComponentProps } from 'react';

export function UiPopoverTitle({ className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="popover-title"
      className={cn('font-medium', className)}
      {...props}
    />
  );
}
