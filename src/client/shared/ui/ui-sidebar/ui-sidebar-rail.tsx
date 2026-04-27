'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import { useSidebar } from './ui-sidebar-provider';

import './styles/sidebar-rail-styles.scss';

export function UiSidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn('sidebar-rail', className)}
      {...props}
    />
  );
}
