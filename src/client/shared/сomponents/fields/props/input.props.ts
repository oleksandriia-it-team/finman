import { JSX } from 'react';
import { InputDefaultProps } from '../../../props/input-default.props';
import { DropdownDefaultProps } from '../../../props/dropdown-default.props';
import { LazyEventProps } from '../../../props/lazy-event.props';

export interface InputProps<T> extends InputDefaultProps {
  onChange: (value: T) => void;
}

export type DefaultDropdownInputProps<T> = Omit<InputProps<T>, 'value'> &
  DropdownDefaultProps<T> & {
    value?: T | undefined | null;
    customInputValue?: string;
  };

export type LazyDropdownInputProps<T> = Omit<InputProps<T>, 'value'> &
  DropdownDefaultProps<T> &
  LazyEventProps & {
    value?: T | undefined | null;
    customInputValue?: string;
  };

export interface DropdownInputTemplateProps extends InputDefaultProps {
  optionsTemplate: JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
  chevronClassName?: string;
}
