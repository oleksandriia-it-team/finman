import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ComponentPropsWithRef } from 'react';

export interface ComboboxInputProps extends Omit<ComboboxPrimitive.Input.Props, 'value'> {
  'data-invalid'?: boolean | undefined;
  onClear?: () => void;
  hasValue: boolean;
}

export type ComboboxMultipleChips = ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props & {
    'data-invalid'?: boolean | undefined;
  };
