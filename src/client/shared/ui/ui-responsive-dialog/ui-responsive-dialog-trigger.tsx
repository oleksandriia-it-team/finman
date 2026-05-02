import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetTrigger } from '@frontend/ui/ui-sheet/ui-sheet-trigger';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import type { ResponsiveDialogActionsProps } from '@frontend/ui/ui-responsive-dialog/props/responsive-dialog-actions.props';

export function UiResponsiveDialogTrigger({ children, ...props }: ResponsiveDialogActionsProps) {
  const isMobile = useIsMobile();

  const Trigger = isMobile ? UiSheetTrigger : UiModalTrigger;

  return <Trigger {...props}>{children}</Trigger>;
}
