import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetContent } from '../ui-sheet/ui-sheet-content';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import type { ResponsiveDialogContentProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-content.props';

export function UiResponsiveDialogContent({ children, mobileSide = 'bottom', ...props }: ResponsiveDialogContentProps) {
  const isMobile = useIsMobile();

  const Content = isMobile ? UiSheetContent : UiModalContent;

  return (
    <Content
      {...props}
      side={mobileSide}
    >
      {children}
    </Content>
  );
}
