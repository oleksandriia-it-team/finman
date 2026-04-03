import { InputDefaultProps } from '../../../props/input-default.props';
import { DefaultDropdownInputProps } from '../../fields/props/input.props';
import { InputControlProps } from '../../../props/input-control.props';

type ControlledDefaultProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  Omit<DefaultDropdownInputProps<T>, 'onChange'> & { lazy?: false };

export type ControlledDropdownProps<T> = InputControlProps & ControlledDefaultProps<T>;
