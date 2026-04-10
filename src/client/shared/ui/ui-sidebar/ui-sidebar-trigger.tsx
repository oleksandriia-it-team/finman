'use client';

import * as React from 'react';
import { PanelLeftIcon } from 'lucide-react';
import { cn } from '@frontend/shared/utils/utils';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useSidebar } from './ui-sidebar-provider';

export function UiSidebarTrigger({ className, onClick, ...props }: React.ComponentProps<typeof UiButton>) {
  const { toggleSidebar } = useSidebar();

  return (
    <UiButton
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </UiButton>
  );
}
