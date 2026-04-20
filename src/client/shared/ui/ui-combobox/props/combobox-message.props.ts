import { type ComponentProps } from 'react';

export interface ComboboxMessageProps extends ComponentProps<'span'> {
  variant?: 'destructive' | 'muted';
}
