import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import type { ResponsiveDialogActionsProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-actions.props';
import { UiSheetButtonClose } from '@frontend/ui/ui-sheet/ui-sheet-button-close';
import { UiModalButtonClose } from '@frontend/ui/ui-modal/ui-modal-button-close';
import type { ReactNode } from 'react';
import { UiSheetClose } from '../ui-sheet/ui-sheet-close';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';

export function UiResponsiveDialogClose({ children, asChild, ...props }: ResponsiveDialogActionsProps) {
  const isMobile = useIsMobile();

  let Close: (props: ResponsiveDialogActionsProps) => ReactNode;

  if (asChild) {
    Close = isMobile ? UiSheetClose : UiModalClose;
  } else {
    Close = isMobile ? UiSheetButtonClose : UiModalButtonClose;
  }

  return (
    <Close
      asChild={asChild ?? false}
      {...props}
    >
      {children}
    </Close>
  );
}
