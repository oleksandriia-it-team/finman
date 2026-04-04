import { Select as SelectPrimitive } from 'radix-ui';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { SelectTriggerProps } from '@frontend/ui/ui-select/props/select-trigger.props';
import { UiInputGroupAddon } from '../ui-input-group/ui-input-group-addon';
import { UiInputGroup } from '@frontend/ui/ui-input-group/ui-input-group';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSelectTrigger({
  className,
  size = 'default',
  children,
  onClear,
  'data-invalid': dataInvalid,
  ...props
}: SelectTriggerProps) {
  return (
    <UiInputGroup
      className={cn('w-auto', className)}
      data-invalid={dataInvalid}
    >
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        className="input-group-control text-left"
        {...props}
      >
        {children}
      </SelectPrimitive.Trigger>

      <UiInputGroupAddon align="inline-end">
        <SelectPrimitive.Icon asChild>
          <button>
            <UiSvgIcon
              name="chevron-down"
              size={size}
            />
          </button>
        </SelectPrimitive.Icon>

        <SelectPrimitive.Icon
          asChild
          onClick={onClear}
        >
          <button>
            <UiSvgIcon
              name="x"
              size={size}
            />
          </button>
        </SelectPrimitive.Icon>
      </UiInputGroupAddon>
    </UiInputGroup>
  );
}
