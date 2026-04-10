import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';

import './styles/sidebar-separator-styles.scss';

export function UiSidebarSeparator({ className, ...props }: React.ComponentProps<typeof UiSeparator>) {
  return (
    <UiSeparator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('sidebar-separator', className)}
      {...props}
    />
  );
}
