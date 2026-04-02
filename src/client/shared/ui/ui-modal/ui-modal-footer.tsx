import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentProps } from 'react';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiModalFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: ComponentProps<'div'> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <UiButton
            type="button"
            variant="default"
            size="default"
          >
            Close
          </UiButton>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}
