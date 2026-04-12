import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-menu-action-styles.scss';

export function UiSidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  type,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      type={!asChild ? (type ?? 'button') : undefined}
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      data-show-on-hover={showOnHover}
      className={cn('sidebar-menu-action', className)}
      {...props}
    />
  );
}
