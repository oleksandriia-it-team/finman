import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-menu-badge-styles.scss';

export function UiSidebarMenuBadge({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn('sidebar-menu-badge', className)}
      {...props}
    />
  );
}
