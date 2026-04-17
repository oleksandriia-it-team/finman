import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiSheetContent } from '@frontend/ui/ui-sheet/ui-sheet-content';
import { ResponsiveMenuContentProps } from '@frontend/ui/ui-responsive-menu/props/responsive-menu-content.props';

export function UiResponsiveMenuContent({ children, className, ...props }: ResponsiveMenuContentProps) {
  const isMobile = useIsMobile();

  const Content = isMobile ? UiSheetContent : UiPopoverContent;

  return (
    <Content
      className={className}
      {...props}
    >
      {children}
    </Content>
  );
}
