import { ControlledLazyAutocompleteProps } from '@frontend/components/controlled-fields/props/controlled-dropdown.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { FinAutocomplete } from '@frontend/components/fields/fin-autocomplete';

export function FinControlledAutocomplete<T>({
  name,
  className,
  showErrors = true,
  label,
  id,
  onSearch,
  customInputValue,
  ...props
}: ControlledLazyAutocompleteProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}

            <FinAutocomplete
              {...props}
              {...field}
              customInputValue={customInputValue}
              onSearch={onSearch}
              data-invalid={fieldState.invalid}
              onBlur={() => {
                field.onBlur();
                field.onChange(field.value);
              }}
              onChange={(val) => {
                onSearch(val?.label ?? '');
                field.onChange(val?.value);
              }}
              className={className}
              id={id}
            />

            {showErrors && <UiFieldError fieldState={fieldState} />}
          </UiField>
        );
      }}
    />
  );
}
