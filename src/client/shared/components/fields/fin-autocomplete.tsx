import { type DefaultAutocompleteInputProps } from '@frontend/components/fields/props/input.props';
import { UiCombobox } from '@frontend/ui/ui-combobox/ui-combobox';
import { UiComboboxInput } from '@frontend/ui/ui-combobox/ui-combobox-input';
import { useState } from 'react';
import { UiComboboxContent } from '@frontend/ui/ui-combobox/ui-combobox-content';
import { FinComboboxList } from '@frontend/components/fields/components/fin-combobox-list';

export function FinAutocomplete<T>({
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
  clearable = true,
  'data-invalid': dataInvalid,
  onBlur,
  ...props
}: DefaultAutocompleteInputProps<T>) {
  const [show, setVisibility] = useState<boolean>(false);

  return (
    <UiCombobox<string>
      open={show}
      onOpenChange={setVisibility}
      items={options}
      // eslint-disable-next-line
      // @ts-ignore
      value={customInputValue}
      inputValue={search}
      onInputValueChange={(v, { reason }) => {
        if (reason !== 'input-clear' && reason !== 'input-change') {
          return;
        }
        onSearch(v);
      }}
      onValueChange={(label) => {
        if (!label) {
          return;
        }
        onChange(options.find((option) => option.label === label));
      }}
      {...props}
    >
      <UiComboboxInput
        {...(clearable ? { onClear: () => onChange(undefined) } : {})}
        disabled={disabled}
        className={className}
        data-invalid={dataInvalid}
        ref={ref}
        id={id}
        onBlur={(e) => onBlur?.(e.nativeEvent)}
        hasValue={!!search || !!customInputValue}
        placeholder={placeholder}
      />

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
