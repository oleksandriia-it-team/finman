import { ComponentProps } from 'react';
import { SizeVariantModel } from '@frontend/shared/models/size-variant.model';

export interface FieldLegendProps extends ComponentProps<'legend'> {
  size?: SizeVariantModel;
}
