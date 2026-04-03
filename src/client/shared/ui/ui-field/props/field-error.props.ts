import { ComponentProps } from 'react';
import { ControllerFieldState } from 'react-hook-form';

export interface FieldErrorProps extends ComponentProps<'p'> {
  fieldState: ControllerFieldState;
}
