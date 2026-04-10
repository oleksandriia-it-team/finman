import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-group-action-styles.scss';

export function UiSidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn('sidebar-group-action', className)}
      {...props}
    />
  );
}
