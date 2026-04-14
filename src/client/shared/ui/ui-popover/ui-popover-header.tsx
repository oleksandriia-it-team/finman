import { type ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiPopoverHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="popover-header"
      className={cn('flex flex-col gap-1 text-sm', className)}
      {...props}
    />
  );
}
