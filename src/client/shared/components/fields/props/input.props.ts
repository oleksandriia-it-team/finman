import { type Dispatch, type Ref } from 'react';
import { type InputDefaultProps } from '../../../props/input-default.props';
import { type DropdownDefaultProps } from '../../../props/dropdown-default.props';
import { type PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { type DropdownOption } from '@frontend/shared/models/dropdown-option.model';

export interface InputProps<T> extends InputDefaultProps {
  onChange: Dispatch<T | undefined>;
  ref?: Ref<HTMLInputElement>;
}

export type DefaultDropdownInputProps<T> = Omit<InputProps<T>, 'value' | 'ref' | 'onChange'> &
  DropdownDefaultProps<T> & {
    value?: T | undefined | null;
    customInputValue?: string | undefined | null;
    ref?: Ref<HTMLButtonElement>;
    onChange: Dispatch<DropdownOption<T> | undefined>;
  };

export type DefaultAutocompleteInputProps<T> = Omit<DefaultDropdownInputProps<T>, 'ref'> &
  LazyOptionsProps<T> & {
    onSearch: Dispatch<string>;
    search: string;
    ref?: Ref<HTMLInputElement>;
  };

export type DefaultAutocompleteMultipleInputProps<T> = Omit<
  DefaultAutocompleteInputProps<T[]>,
  'customInputValue' | 'options' | 'onChange' | 'value' | 'defaultValue'
> & {
  selectedDataFull: DropdownOption<T>[];
  options: DropdownOption<T>[];
  onChange: Dispatch<DropdownOption<T>[] | undefined>;
};

export interface LazyOptionsProps<T> {
  state: PromiseState;
  emptyLabel?: string | undefined;
  loadingLabel?: string | undefined;
  errorLabel?: string | undefined;
  options: DropdownOption<T>[];
  optionListClassName?: string | undefined;
  optionClassName?: string | undefined;
}
