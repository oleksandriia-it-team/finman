import { Controller, useFormContext } from 'react-hook-form';
import { FinDropdown } from '@frontend/components/fields/fin-dropdown/fin-dropdown';
import { ControlledDropdownProps } from './props/controlled-dropdown.props';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiField } from '@frontend/ui/ui-field/ui-field';

export function FinControlledDropdown<T>({
  name,
  className,
  showErrors = true,
  label,
  id,
  ...props
}: ControlledDropdownProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}

            <FinDropdown
              {...props}
              {...field}
              ref={(el) => {
                if (!el) return;

                field.ref({
                  ...el,
                  focus: () => el.click(),
                });
              }}
              data-invalid={fieldState.invalid}
              onBlur={() => {
                field.onBlur();
                field.onChange(field.value);
              }}
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className={className}
              id={field.name}
            />

            {showErrors && <UiFieldError fieldState={fieldState} />}
          </UiField>
        );
      }}
    />
  );
}
