import { UiComboboxList } from '@frontend/ui/ui-combobox/ui-combobox-list';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { UiComboboxMessage } from '@frontend/ui/ui-combobox/ui-combobox-message';
import { UiComboboxItem } from '@frontend/ui/ui-combobox/ui-combobox-item';
import { LazyOptionsProps } from '@frontend/components/fields/props/input.props';

export function FinComboboxList<T>({
  optionListClassName,
  options,
  optionClassName,
  errorLabel,
  loadingLabel,
  emptyLabel,
  state,
}: LazyOptionsProps<T>) {
  return (
    <UiComboboxList className={optionListClassName}>
      {options.length === 0 && state === PromiseState.Success && (
        <UiComboboxMessage>{emptyLabel || 'Нічого не знайдено'}</UiComboboxMessage>
      )}

      {state === PromiseState.Loading && <UiComboboxMessage>{loadingLabel || 'Завантаження...'}</UiComboboxMessage>}

      {state === PromiseState.Error && (
        <UiComboboxMessage variant="destructive">{errorLabel || 'Помилка'}</UiComboboxMessage>
      )}

      {state === PromiseState.Success &&
        options.map((option) => (
          <UiComboboxItem
            className={optionClassName}
            key={option.label}
            value={option.label}
          >
            {option.label}
          </UiComboboxItem>
        ))}
    </UiComboboxList>
  );
}
