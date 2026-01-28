import { JSX } from 'react';
import { InputDefaultProps } from '../../../props/input-default.props';
import { DropdownDefaultProps } from '../../../props/dropdown-default.props';
import { LazyEventProps } from '../../../props/lazy-event.props';

export interface InputProps<T> extends InputDefaultProps {
  onChange: (value: T) => void;
}

export type DefaultDropdownInputProps<T> = InputProps<T> &
  DropdownDefaultProps<T> & {
    customInputValue?: string;
  };

export type LazyDropdownInputProps<T> = InputProps<T> &
  DropdownDefaultProps<T> &
  LazyEventProps & {
    customInputValue?: string;
  };

export interface DropdownInputTemplateProps extends InputDefaultProps {
  optionsTemplate: JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
  chevronClassName?: string;
}
