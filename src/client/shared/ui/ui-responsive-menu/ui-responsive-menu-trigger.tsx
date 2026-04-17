import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetTrigger } from '@frontend/ui/ui-sheet/ui-sheet-trigger';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { ResponsiveMenuTriggerProps } from '@frontend/ui/ui-responsive-menu/props/responsive-menu-trigger.props';

export function UiResponsiveMenuTrigger({ children, ...props }: ResponsiveMenuTriggerProps) {
  const isMobile = useIsMobile();

  const Trigger = isMobile ? UiSheetTrigger : UiPopoverContent;

  return <Trigger {...props}>{children}</Trigger>;
}
