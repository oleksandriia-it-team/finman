import { Select as SelectPrimitive } from 'radix-ui';
import { ComponentProps, Ref } from 'react';
import { IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: IconSize;
  onClear?: () => void;
  ref?: Ref<HTMLButtonElement>;
  'data-invalid'?: boolean | undefined;
}
