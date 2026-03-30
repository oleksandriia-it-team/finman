import { cn } from '@frontend/shared/utils/cn.util';
import { Select as SelectPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';
import { UiSvgIcon } from '../ui-svg-icon/ui-svg-icon';

export function UiSelectScrollUpButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <UiSvgIcon
        name="chevron-up"
        size="default"
      />
    </SelectPrimitive.ScrollUpButton>
  );
}

export function UiSelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <UiSvgIcon
        name="chevron-down"
        size="default"
      />
    </SelectPrimitive.ScrollDownButton>
  );
}
