import { Select as SelectPrimitive } from 'radix-ui';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { type SelectTriggerProps } from '@frontend/ui/ui-select/props/select-trigger.props';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiInputGroupAddon } from '../ui-input-group/ui-input-group-addon';

export function UiSelectTrigger({
  className,
  size = 'default',
  children,
  onClear,
  hasValue,
  'data-invalid': dataInvalid,
  disabled,
  ...props
}: SelectTriggerProps) {
  return (
    <div className="relative">
      <SelectPrimitive.Trigger
        data-invalid={dataInvalid}
        data-slot="select-trigger"
        className={cn('flex w-fit items-center justify-between gap-2 basic-input', className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </SelectPrimitive.Trigger>

      <UiInputGroupAddon
        align="inline-end"
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        <SelectPrimitive.Trigger
          tabIndex={-1}
          type="button"
          className="outline-none"
          disabled={disabled}
        >
          <SelectPrimitive.Icon asChild>
            <UiSvgIcon
              name="chevron-down"
              size={size}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        {onClear && hasValue && (
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            aria-label="Очистити поле"
          >
            <SelectPrimitive.Icon asChild>
              <UiSvgIcon
                name="x"
                size={size}
              />
            </SelectPrimitive.Icon>
          </button>
        )}
      </UiInputGroupAddon>
    </div>
  );
}
