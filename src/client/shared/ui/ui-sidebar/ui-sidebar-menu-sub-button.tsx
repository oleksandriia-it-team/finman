'use client';

import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@frontend/shared/utils/utils';

import './styles/sidebar-menu-sub-button-styles.scss';

export function UiSidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'a';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn('sidebar-menu-sub-button', className)}
      {...props}
    />
  );
}
