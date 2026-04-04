import { InputDefaultProps } from '../../../props/input-default.props';
import { DefaultAutocompleteInputProps, DefaultDropdownInputProps } from '../../fields/props/input.props';
import { InputControlProps } from '../../../props/input-control.props';

type ControlledDefaultProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  Omit<DefaultDropdownInputProps<T>, 'onChange'>;

export type ControlledDropdownProps<T> = InputControlProps & ControlledDefaultProps<T>;

export type ControlledLazyAutocompleteProps<T> = InputControlProps &
  Omit<DefaultAutocompleteInputProps<T>, 'onChange'> & {
    customInputValue: string;
  };
