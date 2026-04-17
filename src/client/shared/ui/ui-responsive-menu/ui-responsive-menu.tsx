import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { UiPopover } from '@frontend/ui/ui-popover/ui-popover';
import { UiSheet } from '@frontend/ui/ui-sheet/ui-sheet';

export function UiResponsiveMenu({ children }: ChildrenComponentProps) {
  const isMobile = useIsMobile();

  const Menu = isMobile ? UiSheet : UiPopover;

  return <Menu>{children}</Menu>;
}
