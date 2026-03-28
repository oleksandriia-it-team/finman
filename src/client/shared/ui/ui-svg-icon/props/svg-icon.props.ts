import { ComponentPropsWithoutRef } from 'react';
import { ButtonSize } from '@frontend/ui/ui-button/props/button.props';

export type IconSize = ButtonSize;

export interface SvgIconProps extends ComponentPropsWithoutRef<'i'> {
  size: IconSize;
  name: string;
}
