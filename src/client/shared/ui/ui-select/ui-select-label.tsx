import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { ComponentProps } from 'react';

export function UiSelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-base text-muted-foreground', className)}
      {...props}
    />
  );
}
