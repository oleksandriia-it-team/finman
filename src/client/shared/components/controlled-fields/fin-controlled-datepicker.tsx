import { type ControlledDatepickerProps, type DatepickerProps } from './props/controlled-datepicker.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { FinDatepicker } from '@frontend/components/datepicker/fin-datepicker';
import type { DateRange } from 'react-day-picker';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinControlledDatepicker({
  name,
  className,
  showErrors = true,
  label,
  id,
  placeholder = '',
  onBlur,
  transformForSingle,
  ...datepickerProps
}: ControlledDatepickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField className="flex-1 min-w-0">
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}
            <FinDatepicker
              {...(datepickerProps as DatepickerProps)}
              ref={(el: HTMLButtonElement | null) => {
                field.ref(
                  el
                    ? {
                        ...el,
                        focus: () => {
                          el.click();
                        },
                      }
                    : null,
                );
              }}
              placeholder={placeholder}
              onBlur={() => {
                field.onBlur();
                onBlur?.();
              }}
              className={cn('min-w-0', className)}
              selected={field.value}
              onSelect={(value: Date | DateRange | undefined) => {
                if (value instanceof Date && transformForSingle) {
                  value = transformForSingle(value);
                }
                field.onChange(value);
              }}
            />
            {showErrors && <UiFieldError fieldState={fieldState} />}
          </UiField>
        );
      }}
    />
  );
}
