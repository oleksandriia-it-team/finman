import { Controller, useFormContext } from 'react-hook-form';
import { FinDropdown } from '@frontend/components/fields/fin-dropdown/fin-dropdown';
import { ControlledDropdownProps } from '../props/controlled-dropdown.props';
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
              value={field.value}
              onChange={(val) => field.onChange(val)}
              className={className}
              id={field.name}
            />

            {showErrors && <UiFieldError errors={[fieldState.error]} />}
          </UiField>
        );
      }}
    />
  );
}
