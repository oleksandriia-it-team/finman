import { Combobox as ComboboxPrimitive } from '@base-ui/react';

export interface ComboboxMessageProps extends ComboboxPrimitive.Label.Props {
  variant?: 'destructive' | 'muted';
}
