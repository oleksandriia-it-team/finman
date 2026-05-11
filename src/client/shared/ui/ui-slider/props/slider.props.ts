import type * as React from 'react';
import type { Slider as SliderPrimitive } from 'radix-ui';
import { type ColorVariantModel } from '@frontend/shared/models/color-variant.model';
import { type SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  variant?: ColorVariantModel;
  size?: SizeVariantModel;
}
