import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import type { ResponsiveDialogActionsProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-actions.props';
import { UiSheetDescription } from '../ui-sheet/ui-sheet-description';
import { UiModalDescription } from '@frontend/ui/ui-modal/ui-modal-description';

export function UiResponsiveDialogDescription({ children, ...props }: ResponsiveDialogActionsProps) {
  const isMobile = useIsMobile();

  const Description = isMobile ? UiSheetDescription : UiModalDescription;

  return <Description {...props}>{children}</Description>;
}
