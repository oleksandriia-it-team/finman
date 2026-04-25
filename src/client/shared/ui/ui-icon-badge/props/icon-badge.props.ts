import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import type { SizeVariantModel } from '@frontend/shared/models/size-variant.model';
import type { ComponentProps } from 'react';

export interface IconBadgeProps extends ComponentProps<'div'> {
  name: string;
  variant?: ColorVariantModel | undefined;
  size?: SizeVariantModel | undefined;
  isRoundedFull?: boolean;
  isReversed?: boolean;
}
