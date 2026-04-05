import { Combobox as ComboboxPrimitive } from '@base-ui/react';

export interface ComboboxInputProps extends Omit<ComboboxPrimitive.Input.Props, 'value'> {
  'data-invalid'?: boolean | undefined;
  onClear?: () => void;
  hasValue: boolean;
}

export interface ComboboxMultipleInputProps extends Omit<ComboboxPrimitive.Input.Props, 'value'> {
  'data-invalid'?: boolean | undefined;
}
