import { type ComponentPropsWithRef } from 'react';
import { type ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import { type SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export type ButtonVariant = ColorVariantModel;

export type ButtonSize = SizeVariantModel;

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isOutlined?: boolean;
  isRoundedFull?: boolean;
  bgNone?: boolean;
  asChild?: boolean;
  borderNone?: boolean;
  paddingNone?: boolean;
}
