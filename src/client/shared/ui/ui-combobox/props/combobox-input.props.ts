import { Combobox as ComboboxPrimitive } from '@base-ui/react';

export interface ComboboxInputProps extends ComboboxPrimitive.Input.Props {
  showTrigger?: boolean;
  showClear?: boolean;
  'data-invalid'?: boolean | undefined;
}
