import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-menu-sub-item-styles.scss';

export function UiSidebarMenuSubItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item sidebar-menu-sub-item', className)}
      {...props}
    />
  );
}
