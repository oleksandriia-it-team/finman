import { Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}
