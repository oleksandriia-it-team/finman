import { DefaultAutocompleteMultipleInputProps } from '@frontend/components/fields/props/input.props';
import { UiCombobox } from '@frontend/ui/ui-combobox/ui-combobox';
import { useState } from 'react';
import { useComboboxAnchor } from '@frontend/ui/ui-combobox/hooks/use-combobox-anchor';
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
  customInputValue,
  'data-invalid': dataInvalid,
  ...props
}: DefaultAutocompleteMultipleInputProps<T[]>) {
  const anchor = useComboboxAnchor();
  const [show, setVisibility] = useState<boolean>(false);

  return (
    <UiCombobox<string, true>
      multiple
      open={show}
      onOpenChange={setVisibility}
      items={options}
      value={customInputValue}
      inputValue={search}
      onInputValueChange={onSearch}
      // onValueChange={(label) => {
      //   if (!label) {
      //     return;
      //   }
      //   onChange(options.find((option) => option.label === label));
      // }}
      disabled={disabled}
    >
      <UiComboboxChips
        ref={anchor}
        className="w-full max-w-xs"
      >
        <UiComboboxValue>
          {customInputValue.map((i) => {
            return <UiComboboxChip key={i}>{i}</UiComboboxChip>;
          })}

          <UiComboboxChipsInput
            className={className}
            // data-invalid={dataInvalid}
            ref={ref}
            id={id}
            placeholder={placeholder}
            {...props}
          />
        </UiComboboxValue>
      </UiComboboxChips>

      <UiComboboxContent anchor={anchor}>
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
