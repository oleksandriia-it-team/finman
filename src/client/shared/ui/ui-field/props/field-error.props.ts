import { ComponentProps } from 'react';

export interface FieldErrorProps extends ComponentProps<'p'> {
  errors?: Array<{ message?: string } | undefined>;
}
