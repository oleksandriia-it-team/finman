'use client';

import * as React from 'react';
import { useSidebar } from './ui-sidebar-provider';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSidebarTrigger({
  className,
  size = 'lg',
  bgNone = true,
  onClick,
  hideOnCollapse,
  ...props
}: Partial<React.ComponentProps<typeof UiIconButton>> & { hideOnCollapse?: boolean }) {
  const { toggleSidebar } = useSidebar();

  return (
    <UiIconButton
      isOutlined={false}
      icon="layout-sidebar"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="muted"
      size={size}
      bgNone={bgNone}
      className={cn(hideOnCollapse && 'group-data-[collapsible=icon]:hidden', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <span className="sr-only">Переключити сайдбар</span>
    </UiIconButton>
  );
}
