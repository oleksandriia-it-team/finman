import type { SizeVariantModel } from '@frontend/shared/models/size-variant.model';
import type { ComponentProps } from 'react';

export interface TextProps extends ComponentProps<'span'> {
  size?: SizeVariantModel | undefined;
}
