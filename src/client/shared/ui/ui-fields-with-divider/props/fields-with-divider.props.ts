import type { ComponentProps, ReactNode } from 'react';

export interface FieldsWithDividerProps extends ComponentProps<'div'> {
  firstField: ReactNode;
  secondField: ReactNode;
}
