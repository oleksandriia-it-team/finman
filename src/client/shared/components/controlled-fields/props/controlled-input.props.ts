import { type InputDefaultProps } from '../../../props/input-default.props';
import { type InputControlProps } from '../../../props/input-control.props';
import type { ComponentProps } from 'react';

export type ControlledInputProps = InputDefaultProps &
  Omit<ComponentProps<'input'>, 'onChange' | 'value' | 'pattern'> &
  InputControlProps & {
    type?: 'text' | 'number' | 'email' | 'password';
    disabled?: boolean;
    pattern?: RegExp | string | undefined;
  };

export type ControlledTextareaProps = InputDefaultProps &
  Omit<ComponentProps<'textarea'>, 'onChange' | 'value' | 'pattern'> &
  InputControlProps & {
    type?: 'text' | 'number' | 'email' | 'password';
    disabled?: boolean;
    pattern?: RegExp | string | undefined;
  };
