import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiSheetTrigger } from '@frontend/ui/ui-sheet/ui-sheet-trigger';
import { ResponsiveMenuTriggerProps } from '@frontend/ui/ui-responsive-menu/props/responsive-menu-trigger.props';
import { UiPopoverTrigger } from '@frontend/ui/ui-popover/ui-popover-trigger';

export function UiResponsiveMenuTrigger({ children, ...props }: ResponsiveMenuTriggerProps) {
  const isMobile = useIsMobile();

  const Trigger = isMobile ? UiSheetTrigger : UiPopoverTrigger;

  return <Trigger {...props}>{children}</Trigger>;
}
