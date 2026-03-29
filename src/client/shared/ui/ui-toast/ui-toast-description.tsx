import { Toast } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiToastDescription({ className, ...props }: Toast.ToastDescriptionProps) {
  return (
    <p
      data-slot="toast-description"
      className={cn('text-muted-foreground', className)}
      {...props}
    />
  );
}
