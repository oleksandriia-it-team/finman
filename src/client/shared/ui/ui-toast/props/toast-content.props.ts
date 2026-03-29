import { Toast } from 'radix-ui';
import { ComponentProps } from 'react';
import { ButtonVariant } from '@frontend/ui/ui-button/props/button.props';

export type ToastVariant = ButtonVariant;

export interface UiToastContentProps extends ComponentProps<typeof Toast.Root> {
  variant?: ToastVariant;
}
