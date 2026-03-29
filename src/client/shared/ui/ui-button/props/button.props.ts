import { ComponentPropsWithRef } from 'react';
import { ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import { SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export type ButtonVariant = ColorVariantModel | 'link';

export type ButtonSize = SizeVariantModel;

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isOutlined?: boolean;
  isRoundedFull?: boolean;
  bgNone?: boolean;
  asChild?: boolean;
}
