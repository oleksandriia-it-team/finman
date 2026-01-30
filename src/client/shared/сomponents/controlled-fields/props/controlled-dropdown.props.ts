import { InputDefaultProps } from '../../../props/input-default.props';
import { DropdownDefaultProps } from '../../../props/dropdown-default.props';
import { InputControlProps } from '../../../props/input-control.props';

export type ControlledDropdownProps<T> = Omit<InputDefaultProps, 'value'> & DropdownDefaultProps<T> & InputControlProps;
