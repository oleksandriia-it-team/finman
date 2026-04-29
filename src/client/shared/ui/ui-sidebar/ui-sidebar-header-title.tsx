'use client';

import { type ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSidebarHeaderTitle({ className, ...props }: ComponentProps<'h3'>) {
  return (
    <h3
      className={cn('font-medium text-sidebar-foreground group-data-[collapsible=icon]:hidden', className)}
      {...props}
    />
  );
}
