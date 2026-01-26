import { JSX } from 'react';
import { InputDefaultProps } from '../../../props/input-default.props';
import { DropdownDefaultProps } from '../../../props/dropdown-default.props';

export interface InputProps<T> extends InputDefaultProps {
  onChange: (value: T) => void;
}

export type DropdownInputProps<T> = InputProps<T> &
  DropdownDefaultProps<T> & {
    customInputValue?: boolean;
  };

export interface DropdownInputTemplateProps extends InputDefaultProps {
  optionsTemplate: JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
  chevronClassName?: string;
}
