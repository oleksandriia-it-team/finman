import { ControlledLazyMultipleAutocompleteProps } from '@frontend/components/controlled-fields/props/controlled-dropdown.props';
import { Controller, useFormContext } from 'react-hook-form';
import { UiField } from '@frontend/ui/ui-field/ui-field';
import { UiFieldLabel } from '@frontend/ui/ui-field/ui-field-label';
import { UiFieldError } from '@frontend/ui/ui-field/ui-field-error';
import { FinMultipleAutocomplete } from '../fields/fin-multiple-autocomplete';

export function FinControlledMultipleAutocomplete<T>({
  name,
  className,
  showErrors = true,
  label,
  id,
  onSearch,
  selectedDataFull,
  options,
  ...props
}: ControlledLazyMultipleAutocompleteProps<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UiField>
            {label && <UiFieldLabel htmlFor={id}>{label}</UiFieldLabel>}

            <FinMultipleAutocomplete
              {...props}
              {...field}
              options={options}
              selectedDataFull={selectedDataFull}
              onSearch={onSearch}
              data-invalid={fieldState.invalid}
              onBlur={() => {
                field.onBlur();
                field.onChange(field.value);
              }}
              onChange={(val = []) => {
                if (val.length > (field.value?.length ?? 0)) {
                  onSearch(val[val.length - 1].label);
                }

                field.onChange(val.map((i) => i.value));
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
