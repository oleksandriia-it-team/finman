import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheet } from '@frontend/ui/ui-sheet/ui-sheet';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';

export function UiResponsiveDialog({ children }: ChildrenComponentProps) {
  const isMobile = useIsMobile();

  const Dialog = isMobile ? UiSheet : UiModal;

  return <Dialog>{children}</Dialog>;
}
