import { InputDefaultProps } from '../../../props/input-default.props';
import { DefaultDropdownInputProps, LazyDropdownInputProps } from '../../fields/props/input.props';
import { InputControlProps } from '../../../props/input-control.props';

type ControlledLazyProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  LazyDropdownInputProps<T> & { lazy: true };

type ControlledDefaultProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  DefaultDropdownInputProps<T> & { lazy?: false };

export type ControlledDropdownProps<T> = InputControlProps & (ControlledLazyProps<T> | ControlledDefaultProps<T>);
