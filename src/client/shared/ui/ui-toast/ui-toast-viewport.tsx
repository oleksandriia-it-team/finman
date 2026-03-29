import { Toast } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/toast-viewport-styles.scss';

export function UiToastViewport({ className, ...props }: Toast.ToastViewportProps) {
  return (
    <Toast.ToastViewport
      data-slot="toast-viewport"
      className={cn(className, 'toast-viewport')}
      {...props}
    />
  );
}
