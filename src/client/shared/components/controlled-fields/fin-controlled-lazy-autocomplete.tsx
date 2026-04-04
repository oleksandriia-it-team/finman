import { ControlledLazyAutocompleteProps } from '@frontend/components/controlled-fields/props/controlled-dropdown.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { FinLazyAutocomplete } from '@frontend/components/fields/fin-lazy-autocomplete/fin-lazy-autocomplete';

export function FinControlledLazyAutocomplete<T>({
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

            <FinLazyAutocomplete
              {...props}
              {...field}
              customInputValue={customInputValue}
              onSearch={onSearch}
              data-invalid={fieldState.invalid}
              onBlur={() => {
                field.onBlur();
                onSearch(field.value);
                field.onChange(field.value);
              }}
              value={field.value}
              onChange={(val) => {
                onSearch(val ?? '');
                field.onChange(val ?? '');
              }}
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
