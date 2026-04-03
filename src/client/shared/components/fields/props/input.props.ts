import { Dispatch, SetStateAction } from 'react';
import { InputDefaultProps } from '../../../props/input-default.props';
import { DropdownDefaultProps } from '../../../props/dropdown-default.props';

export interface InputProps<T> extends InputDefaultProps {
  onChange: Dispatch<SetStateAction<T | undefined>>;
}

export type DefaultDropdownInputProps<T> = Omit<InputProps<T>, 'value'> &
  DropdownDefaultProps<T> & {
    value?: T | undefined | null;
    customInputValue?: string | undefined | null;
  };
