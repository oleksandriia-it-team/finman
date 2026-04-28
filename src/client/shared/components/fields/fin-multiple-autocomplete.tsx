import { type DefaultAutocompleteMultipleInputProps } from '@frontend/components/fields/props/input.props';
import { UiCombobox } from '@frontend/ui/ui-combobox/ui-combobox';
import { useState } from 'react';
import { UiComboboxContent } from '@frontend/ui/ui-combobox/ui-combobox-content';
import { FinComboboxList } from '@frontend/components/fields/components/fin-combobox-list';
import { UiComboboxChips } from '@frontend/ui/ui-combobox/ui-combobox-chips';
import { UiComboboxValue } from '@frontend/ui/ui-combobox/ui-combobox-value';
import { UiComboboxChip } from '@frontend/ui/ui-combobox/ui-combobox-chip';
import { UiComboboxChipsInput } from '@frontend/ui/ui-combobox/ui-combobox-chips-input';

export function FinMultipleAutocomplete<T>({
  onChange,
  options,
  optionListClassName,
  optionClassName,
  id,
  className,
  placeholder,
  ref,
  search,
  onSearch,
  state,
  emptyLabel,
  errorLabel,
  loadingLabel,
  disabled,
  selectedDataFull,
  'data-invalid': dataInvalid,
  onBlur,
}: DefaultAutocompleteMultipleInputProps<T>) {
  const [show, setVisibility] = useState<boolean>(false);

  const customInputValue = selectedDataFull.map((i) => i.label);

  return (
    <UiCombobox<string, true>
      multiple
      open={show}
      onOpenChange={(v, { reason }) => {
        if (reason === 'item-press') {
          return;
        }

        setVisibility(v);
      }}
      items={options}
      value={customInputValue}
      inputValue={search}
      onInputValueChange={(value, { reason }) => {
        if (reason === 'input-clear') return;
        onSearch(value);
      }}
      onValueChange={(updatedValues) => {
        const removedValues = customInputValue?.filter((v) => !updatedValues.includes(v));
        const addedValues = updatedValues
          ?.filter((v) => !customInputValue.includes(v))
          .map((label) => options.find((option) => option.label === label))
          .filter((option) => !!option);
        const remainValues = selectedDataFull.filter((v) => !removedValues?.length || !removedValues.includes(v.label));
        onChange([...remainValues, ...addedValues]);
      }}
    >
      <UiComboboxChips
        onBlur={(e) => onBlur?.(e.nativeEvent)}
        data-invalid={dataInvalid}
        className="w-full max-w-xs"
      >
        <UiComboboxValue>
          {customInputValue.map((i) => {
            return <UiComboboxChip key={i}>{i}</UiComboboxChip>;
          })}

          <UiComboboxChipsInput
            disabled={disabled}
            className={className}
            ref={ref}
            id={id}
            placeholder={placeholder}
          />
        </UiComboboxValue>
      </UiComboboxChips>

      <UiComboboxContent>
        <FinComboboxList
          optionListClassName={optionListClassName}
          options={options}
          optionClassName={optionClassName}
          errorLabel={errorLabel}
          loadingLabel={loadingLabel}
          emptyLabel={emptyLabel}
          state={state}
        />
      </UiComboboxContent>
    </UiCombobox>
  );
}
