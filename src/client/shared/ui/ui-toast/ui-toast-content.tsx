import { Toast } from 'radix-ui';
import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/toast-content-styles.scss';

export function UiToastContent({ className, ...props }: ComponentProps<typeof Toast.Root>) {
  return (
    <Toast.Root
      data-slot="toast-content"
      className={cn(className, 'text-sm bg-background rounded-md shadow-lg p-1 toast-content')}
      {...props}
    />
  );
}
