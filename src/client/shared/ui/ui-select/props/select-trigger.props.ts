import { type Select as SelectPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';
import { type IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

export interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: IconSize;
}
