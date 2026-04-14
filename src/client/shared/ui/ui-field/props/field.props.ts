import { type ComponentProps } from 'react';

export type FieldOrientationVariant = 'vertical' | 'horizontal' | 'responsive';

export interface FieldProps extends ComponentProps<'div'> {
  orientation?: FieldOrientationVariant;
}
