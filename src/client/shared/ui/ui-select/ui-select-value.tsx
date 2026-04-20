import { Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

export function UiSelectValue({ ...props }: ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...props}
    />
  );
}
