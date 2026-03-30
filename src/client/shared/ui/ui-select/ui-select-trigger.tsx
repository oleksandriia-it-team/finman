import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { SelectTriggerProps } from '@frontend/ui/ui-select/props/select-trigger.props';

export function UiSelectTrigger({ className, size = 'default', children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn('flex w-fit items-center justify-between gap-2', className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <UiSvgIcon
          name="chevron-down"
          size={size}
          className="opacity-50"
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
