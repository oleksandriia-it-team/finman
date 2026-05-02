import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetTitle } from '../ui-sheet/ui-sheet-title';
import { UiModalTitle } from '../ui-modal/ui-modal-title';
import type { ResponsiveDialogWithContentProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-with-content.props';

export function UiResponsiveDialogTitle({ children, ...props }: ResponsiveDialogWithContentProps) {
  const isMobile = useIsMobile();

  const Title = isMobile ? UiSheetTitle : UiModalTitle;

  return <Title {...props}>{children}</Title>;
}
