import { JSX } from 'react';
import { InputDefaultProps } from '../../../models/input-default-props.model';
import { DropdownDefaultPropsModel } from '../../../models/dropdown-default-props.model';

export interface InputProps<T> extends InputDefaultProps {
  onChange: (value: T) => void;
}

export type DropdownInputProps<T> = InputProps<T> &
  DropdownDefaultPropsModel<T> & {
    customInputValue?: boolean;
  };

export interface DropdownInputTemplateProps extends InputDefaultProps {
  optionsTemplate: JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
  chevronClassName?: string;
}
