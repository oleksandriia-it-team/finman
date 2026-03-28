import { Toast } from 'radix-ui';
import { ComponentProps, useState } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import { ToastVisibleContext } from '@frontend/ui/ui-toast/hooks/toast-visible.hook';

export function UiToastContent({
  className,
  children,
  ...props
}: Omit<ComponentProps<typeof Toast.Root>, 'open' | 'onOpenChange'>) {
  const [open, onOpenChange] = useState<boolean>(false);

  return (
    <ToastVisibleContext.Provider value={{ open, onOpenChange }}>
      <Toast.Root
        data-slot="toast-content"
        className={cn(className, 'bg-background rounded-md shadow-lg p-1')}
        open={open}
        onOpenChange={onOpenChange}
        {...props}
      >
        {children}
      </Toast.Root>
    </ToastVisibleContext.Provider>
  );
}
