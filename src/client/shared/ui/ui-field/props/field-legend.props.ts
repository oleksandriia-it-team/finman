import { type ComponentProps } from 'react';
import { type SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export interface FieldLegendProps extends ComponentProps<'legend'> {
  size?: SizeVariantModel;
}
