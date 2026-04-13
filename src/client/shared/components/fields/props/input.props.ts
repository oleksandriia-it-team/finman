import { type Dispatch, type SetStateAction } from 'react';
import { type InputDefaultProps } from '../../../props/input-default.props';
import { type DropdownDefaultProps } from '../../../props/dropdown-default.props';
import { type LazyEventProps } from '../../../props/lazy-event.props';

export interface InputProps<T> extends InputDefaultProps {
  onChange: Dispatch<SetStateAction<T | undefined>>;
}

export type DefaultDropdownInputProps<T> = Omit<InputProps<T>, 'value'> &
  DropdownDefaultProps<T> & {
    value?: T | undefined | null;
    customInputValue?: string | undefined | null;
  };

export type LazyDropdownInputProps<T> = Omit<InputProps<T>, 'value'> &
  DropdownDefaultProps<T> &
  LazyEventProps & {
    value?: T | undefined | null;
    customInputValue?: string | undefined | null;
  };
