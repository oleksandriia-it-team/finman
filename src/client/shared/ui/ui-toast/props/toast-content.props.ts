import { Toast } from 'radix-ui';
import { ComponentProps } from 'react';
import { ColorVariantModel } from '@frontend/shared/models/color-variant.model';

export type ToastVariant = ColorVariantModel;

export interface UiToastContentProps extends ComponentProps<typeof Toast.Root> {
  variant?: ToastVariant;
}
