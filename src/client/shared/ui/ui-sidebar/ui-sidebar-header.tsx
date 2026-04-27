import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-header-styles.scss';

export function UiSidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('sidebar-header', className)}
      {...props}
    />
  );
}
