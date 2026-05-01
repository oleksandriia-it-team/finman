import { type ComponentPropsWithRef } from 'react';
import { type ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import { type SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ColorVariantModel | undefined;
  size?: SizeVariantModel | undefined;
  isOutlined?: boolean;
  isRoundedFull?: boolean;
  bgNone?: boolean;
  asChild?: boolean;
  borderNone?: boolean;
  paddingNone?: boolean;
  opacity?: boolean;
  heightAuto?: boolean;
  borderBold?: boolean;
}
