import { ComponentProps } from 'react';

export type FieldOrientationVariant = 'orientation' | 'horizontal' | 'responsive';

export interface FieldProps extends ComponentProps<'div'> {
  orientation?: FieldOrientationVariant;
}
