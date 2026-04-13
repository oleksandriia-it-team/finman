import { type ComponentPropsWithoutRef } from 'react';
import { type SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export type IconSize = SizeVariantModel;

export interface SvgIconProps extends ComponentPropsWithoutRef<'i'> {
  size?: IconSize;
  name: string;
}
