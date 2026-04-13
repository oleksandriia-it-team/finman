import { type Toast } from 'radix-ui';
import { type ComponentProps } from 'react';
import { type ColorVariantModel } from '@frontend/shared/models/color-variant.model';

export type ToastVariant = ColorVariantModel;

export interface UiToastContentProps extends ComponentProps<typeof Toast.Root> {
  variant?: ToastVariant;
}
