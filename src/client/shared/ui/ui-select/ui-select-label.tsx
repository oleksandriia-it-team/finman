import { Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

export function UiSelectLabel(props: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      {...props}
    />
  );
}
