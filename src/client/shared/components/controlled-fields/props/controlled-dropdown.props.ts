import { type InputDefaultProps } from '../../../props/input-default.props';
import { type DefaultDropdownInputProps, type LazyDropdownInputProps } from '../../fields/props/input.props';
import { type InputControlProps } from '../../../props/input-control.props';

type ControlledLazyProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  Omit<LazyDropdownInputProps<T>, 'onChange'> & { lazy: true };

type ControlledDefaultProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  Omit<DefaultDropdownInputProps<T>, 'onChange'> & { lazy?: false };

export type ControlledDropdownProps<T> = InputControlProps & (ControlledLazyProps<T> | ControlledDefaultProps<T>);
