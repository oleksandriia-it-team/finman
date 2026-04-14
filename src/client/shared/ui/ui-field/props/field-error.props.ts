import { type ComponentProps } from 'react';
import { type ControllerFieldState } from 'react-hook-form';

export interface FieldErrorProps extends ComponentProps<'p'> {
  fieldState: ControllerFieldState;
}
