import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import type { SizeVariantModel } from '@frontend/shared/models/size-variant.model';
import type { ComponentProps } from 'react';

export interface ActionsButtonProps extends ComponentProps<'button'> {
  icon: string;
  iconVariant?: ColorVariantModel | undefined;
  variant?: ColorVariantModel | undefined;
  size?: SizeVariantModel | undefined;
}
