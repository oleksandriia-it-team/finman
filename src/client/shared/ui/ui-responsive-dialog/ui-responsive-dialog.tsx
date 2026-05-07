'use client';

import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheet } from '@frontend/ui/ui-sheet/ui-sheet';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import type { ResponsiveDialogProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog.props';

export function UiResponsiveDialog({ children, open, openChange }: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  const Dialog = isMobile ? UiSheet : UiModal;

  return (
    <Dialog
      open={open as never}
      onOpenChange={openChange as never}
    >
      {children}
    </Dialog>
  );
}
