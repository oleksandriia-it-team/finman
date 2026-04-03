import { DefaultAutocompleteInputProps } from '@frontend/components/fields/props/input.props';
import { UiCombobox } from '@frontend/ui/ui-combobox/ui-combobox';
import { UiComboboxInput } from '@frontend/ui/ui-combobox/ui-combobox-input';
import { useMemo, useState } from 'react';
import { UiComboboxContent } from '@frontend/ui/ui-combobox/ui-combobox-content';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { UiComboboxList } from '@frontend/ui/ui-combobox/ui-combobox-list';
import { UiComboboxItem } from '@frontend/ui/ui-combobox/ui-combobox-item';
import { UiComboboxMessage } from '@frontend/ui/ui-combobox/ui-combobox-message';

export function FinLazyAutocomplete<T>({
  onChange,
  options,
  optionListClassName,
  optionClassName,
  customInputValue,
  value,
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
  'data-invalid': dataInvalid,
  ...props
}: DefaultAutocompleteInputProps<T>) {
  const [show, setVisibility] = useState<boolean>(false);

  const inputValue = useMemo(() => {
    if (customInputValue) {
      return customInputValue;
    }

    return options.find((option) => option.value === value)?.label;
  }, [customInputValue, value, options]);

  return (
    <UiCombobox<string>
      open={show}
      onOpenChange={setVisibility}
      items={options}
      value={inputValue ?? ''}
      onValueChange={(label) => {
        if (!label) {
          return;
        }
        onChange(options.find((option) => option.label === label)?.value);
      }}
      {...props}
    >
      <UiComboboxInput
        className={className}
        data-invalid={dataInvalid}
        ref={ref}
        id={id}
        placeholder={placeholder}
        value={search}
        onInput={(event) => {
          const target = event.target as HTMLInputElement;
          onSearch(target.value);
        }}
      />

      <UiComboboxContent>
        <UiComboboxList className={optionListClassName}>
          {options.length === 0 && state === PromiseState.Success && (
            <UiComboboxMessage>{emptyLabel || 'Нічого не знайдено'}</UiComboboxMessage>
          )}

          {state === PromiseState.Loading && <UiComboboxMessage>{loadingLabel || 'Завантаження...'}</UiComboboxMessage>}

          {state === PromiseState.Error && (
            <UiComboboxMessage variant="destructive">{errorLabel || 'Помилка'}</UiComboboxMessage>
          )}

          {options.map((option) => (
            <UiComboboxItem
              className={optionClassName}
              key={option.label}
              value={option.label}
            >
              {option.label}
            </UiComboboxItem>
          ))}
        </UiComboboxList>
      </UiComboboxContent>
    </UiCombobox>
  );
}
