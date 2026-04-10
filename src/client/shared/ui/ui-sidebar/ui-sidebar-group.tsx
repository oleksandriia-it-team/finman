import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-group-styles.scss';

export function UiSidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('sidebar-group', className)}
      {...props}
    />
  );
}
