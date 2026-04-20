'use client';

import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import { UiPopoverContent } from '@frontend/ui/ui-popover/ui-popover-content';
import { UiSheetContent } from '@frontend/ui/ui-sheet/ui-sheet-content';
import { type ResponsiveMenuContentProps } from '@frontend/ui/ui-responsive-menu/props/responsive-menu-content.props';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiResponsiveMenuContent({ children, className, ...props }: ResponsiveMenuContentProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <UiPopoverContent
          className={cn('!w-fit !py-2 !px-3', className)}
          {...props}
        >
          {children}
        </UiPopoverContent>
      )}

      {isMobile && (
        <UiSheetContent
          side="bottom"
          showCloseButton={false}
          className={cn('w-full !gap-0 py-2 px-3 items-center', className)}
          {...props}
        >
          <div className="w-fit">{children}</div>
        </UiSheetContent>
      )}
    </>
  );
}
