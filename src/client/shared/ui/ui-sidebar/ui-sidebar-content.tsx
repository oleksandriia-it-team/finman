import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-content-styles.scss';

export function UiSidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn('sidebar-content', className)}
      {...props}
    />
  );
}
