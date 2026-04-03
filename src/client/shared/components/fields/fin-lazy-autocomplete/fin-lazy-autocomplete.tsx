import { DefaultAutocompleteInputProps } from '@frontend/components/fields/props/input.props';
import { UiCombobox } from '@frontend/ui/ui-combobox/ui-combobox';
import { UiComboboxInput } from '@frontend/ui/ui-combobox/ui-combobox-input';
import { useMemo, useState } from 'react';
import { UiComboboxContent } from '@frontend/ui/ui-combobox/ui-combobox-content';
import { UiComboboxEmpty } from '@frontend/ui/ui-combobox/ui-combobox-empty';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { UiComboboxLabel } from '@frontend/ui/ui-combobox/ui-combobox-label';
import { UiComboboxList } from '@frontend/ui/ui-combobox/ui-combobox-list';
import { UiComboboxItem } from '@frontend/ui/ui-combobox/ui-combobox-item';

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
        data-invalid={dataInvalid}
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={className}
        value={search}
        onInput={(event) => {
          const target = event.target as HTMLInputElement;
          onSearch(target.value);
        }}
      />

      <UiComboboxContent>
        {options.length === 0 && state === PromiseState.Success && (
          <UiComboboxEmpty>{emptyLabel ?? 'Нічого не знайдено'}</UiComboboxEmpty>
        )}

        {state === PromiseState.Loading && <UiComboboxLabel>{loadingLabel ?? 'Завантаження...'}</UiComboboxLabel>}

        {state === PromiseState.Error && (
          <UiComboboxLabel variant="destructive">{errorLabel ?? 'Помилка'}</UiComboboxLabel>
        )}

        <UiComboboxList className={optionListClassName}>
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
