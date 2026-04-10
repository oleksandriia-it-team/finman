import * as React from 'react';

import './styles/sidebar-content-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn('sidebar-content p-2', className)}
      {...props}
    />
  );
}
