import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetHeader } from '../ui-sheet/ui-sheet-header';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import type { ResponsiveDialogWithContentProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-with-content.props';

export function UiResponsiveDialogHeader({ children, ...props }: ResponsiveDialogWithContentProps) {
  const isMobile = useIsMobile();

  const Header = isMobile ? UiSheetHeader : UiModalHeader;

  return <Header {...props}>{children}</Header>;
}
