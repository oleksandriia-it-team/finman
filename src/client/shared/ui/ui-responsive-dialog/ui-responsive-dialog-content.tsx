'use client';

import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetContent } from '../ui-sheet/ui-sheet-content';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import type { ResponsiveDialogContentProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-content.props';

export function UiResponsiveDialogContent({ children, mobileSide = 'bottom', ...props }: ResponsiveDialogContentProps) {
  const isMobile = useIsMobile();

  return isMobile ? (
    <UiSheetContent
      {...props}
      side={mobileSide}
    >
      {children}
    </UiSheetContent>
  ) : (
    <UiModalContent {...props}>{children}</UiModalContent>
  );
}
