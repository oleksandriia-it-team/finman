import * as React from 'react';

import './styles/sidebar-footer-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';

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
