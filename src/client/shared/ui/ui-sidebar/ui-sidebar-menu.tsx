import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-menu-styles.scss';

export function UiSidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('sidebar-menu', className)}
      {...props}
    />
  );
}
