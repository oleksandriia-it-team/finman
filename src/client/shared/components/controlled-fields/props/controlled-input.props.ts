import { type InputDefaultProps } from '../../../props/input-default.props';
import { type InputControlProps } from '../../../props/input-control.props';

export type ControlledInputProps = InputDefaultProps &
  InputControlProps & {
    type?: 'text' | 'number' | 'email' | 'password';
    disabled?: boolean;
  };
