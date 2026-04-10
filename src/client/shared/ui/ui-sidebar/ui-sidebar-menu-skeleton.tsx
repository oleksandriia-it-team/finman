import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';

import './styles/sidebar-menu-skeleton-styles.scss';

export function UiSidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('sidebar-menu-skeleton', className)}
      {...props}
    >
      {showIcon && (
        <UiSkeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <UiSkeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
