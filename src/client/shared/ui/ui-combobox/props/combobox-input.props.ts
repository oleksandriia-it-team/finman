import { Combobox as ComboboxPrimitive } from '@base-ui/react';

export interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  'data-invalid'?: boolean | undefined;
  onClear?: () => void;
}
