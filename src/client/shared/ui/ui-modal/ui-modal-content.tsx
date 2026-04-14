import { Dialog as DialogPrimitive } from 'radix-ui';
import { type ComponentProps } from 'react';
import { UiModalPortal } from '@frontend/ui/ui-modal/ui-modal-portal';
import { UiModalOverlay } from '@frontend/ui/ui-modal/ui-modal-overlay';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-modal-content-styles.scss';

export function UiModalContent({ className, children, ...props }: ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <UiModalPortal data-slot="dialog-portal">
      <UiModalOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn('modal-content', className)}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </UiModalPortal>
  );
}
