import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetFooter } from '../ui-sheet/ui-sheet-footer';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import type { ResponsiveDialogWithContentProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-with-content.props';

export function UiResponsiveDialogFooter({ children, ...props }: ResponsiveDialogWithContentProps) {
  const isMobile = useIsMobile();

  const Footer = isMobile ? UiSheetFooter : UiModalFooter;

  return <Footer {...props}>{children}</Footer>;
}
