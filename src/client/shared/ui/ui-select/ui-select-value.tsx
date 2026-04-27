import { Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';

export function UiSelectValue({ placeholder, children, ...props }: ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      placeholder={placeholder}
      {...props}
    />
  );
}
