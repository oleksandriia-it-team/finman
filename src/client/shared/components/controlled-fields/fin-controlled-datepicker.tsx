import { type ControlledDatepickerProps, type DatepickerProps } from './props/controlled-datepicker.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { FinDatepicker } from '@frontend/components/datepicker/fin-datepicker';
import type { DateRange } from 'react-day-picker';

export function FinControlledDatepicker({
  name,
  className,
  showErrors = true,
  label,
  id,
  placeholder = '',
  onBlur,
  ...datepickerProps
}: ControlledDatepickerProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}
            <FinDatepicker
              {...(datepickerProps as DatepickerProps)}
              ref={(el: HTMLButtonElement) => {
                if (!el) return;

                field.ref({
                  ...el,
                  focus: () => {
                    el.click();
                  },
                });
              }}
              placeholder={placeholder}
              onBlur={() => {
                field.onBlur();
                onBlur?.();
              }}
              className={className ?? ''}
              selected={field.value}
              onSelect={(value: Date | DateRange | undefined) => {
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
