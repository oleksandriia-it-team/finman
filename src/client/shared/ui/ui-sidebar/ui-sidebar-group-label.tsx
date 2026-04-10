import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/sidebar-group-label-styles.scss';

export function UiSidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn('sidebar-group-label', className)}
      {...props}
    />
  );
}
