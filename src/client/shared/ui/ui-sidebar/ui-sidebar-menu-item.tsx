import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-menu-item-styles.scss';

export function UiSidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item sidebar-menu-item', className)}
      {...props}
    />
  );
}
