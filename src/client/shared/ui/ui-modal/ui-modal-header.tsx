import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiModalHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}
