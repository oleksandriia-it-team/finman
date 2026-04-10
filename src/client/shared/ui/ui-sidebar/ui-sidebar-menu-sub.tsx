import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-menu-sub-styles.scss';

export function UiSidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn('sidebar-menu-sub', className)}
      {...props}
    />
  );
}
