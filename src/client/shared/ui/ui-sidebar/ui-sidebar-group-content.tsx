import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-group-content-styles.scss';

export function UiSidebarGroupContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('sidebar-group-content', className)}
      {...props}
    />
  );
}
