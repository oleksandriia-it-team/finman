import { Dispatch, Ref, SetStateAction } from 'react';
import { InputDefaultProps } from '../../../props/input-default.props';
import { DropdownDefaultProps } from '../../../props/dropdown-default.props';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';

export interface InputProps<T> extends InputDefaultProps {
  onChange: Dispatch<SetStateAction<T | undefined>>;
  ref?: Ref<HTMLInputElement>;
}

export type DefaultDropdownInputProps<T> = Omit<InputProps<T>, 'value' | 'ref'> &
  DropdownDefaultProps<T> & {
    value?: T | undefined | null;
    customInputValue?: string | undefined | null;
    ref?: Ref<HTMLButtonElement>;
  };

export type DefaultAutocompleteInputProps<T> = Omit<DefaultDropdownInputProps<T>, 'ref'> & {
  onSearch: Dispatch<SetStateAction<string>>;
  search: string;
  state: PromiseState;
  emptyLabel?: string;
  loadingLabel?: string;
  errorLabel?: string;
  ref?: Ref<HTMLInputElement>;
};
