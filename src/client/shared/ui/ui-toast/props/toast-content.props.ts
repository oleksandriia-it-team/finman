import { Toast } from 'radix-ui';
import { ComponentProps } from 'react';

export type ToastVariant = 'default' | 'destructive' | 'success' | 'warning';

export interface UiToastContentProps extends ComponentProps<typeof Toast.Root> {
  variant?: ToastVariant;
}
