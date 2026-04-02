import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-modal-overlay-styles.scss';

export function UiModalOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn('modal-overlay', className)}
      {...props}
    />
  );
}
