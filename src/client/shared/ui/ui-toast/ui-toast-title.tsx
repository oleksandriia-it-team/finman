import { cn } from '@frontend/shared/utils/cn.util';
import { Toast } from 'radix-ui';

export function UiToastTitle({ className, ...props }: Toast.ToastTitleProps) {
  return (
    <h3
      data-slot="toast-title"
      {...props}
      className={cn(className, 'font-medium text-foreground')}
    />
  );
}
