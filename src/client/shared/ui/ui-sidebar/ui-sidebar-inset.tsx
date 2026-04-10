import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-inset-styles.scss';

export function UiSidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn('sidebar-inset', className)}
      {...props}
    />
  );
}
