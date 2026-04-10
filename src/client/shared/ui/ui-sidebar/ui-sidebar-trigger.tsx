'use client';

import * as React from 'react';
import { useSidebar } from './ui-sidebar-provider';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiSidebarTrigger({
  className,
  size = 'lg',
  bgNone = true,
  onClick,
  ...props
}: React.ComponentProps<typeof UiIconButton>) {
  const { toggleSidebar } = useSidebar();

  return (
    <UiIconButton
      name="layout-sidebar"
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="default"
      size={size}
      bgNone={bgNone}
      className={className}
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
