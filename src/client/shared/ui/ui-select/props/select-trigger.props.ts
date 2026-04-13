import { type Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps, type Ref } from 'react';
import { type IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: IconSize;
  onClear?: () => void;
  hasValue?: boolean;
  ref?: Ref<HTMLButtonElement>;
  'data-invalid'?: boolean | undefined;
}
