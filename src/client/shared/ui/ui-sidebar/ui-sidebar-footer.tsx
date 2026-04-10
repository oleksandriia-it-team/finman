import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-footer-styles.scss';

export function UiSidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('sidebar-footer', className)}
      {...props}
    />
  );
}
