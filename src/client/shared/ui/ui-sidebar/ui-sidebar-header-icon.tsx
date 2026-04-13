'use client';

import { ComponentProps, useState } from 'react';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { useSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiSidebarHeaderIcon({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ComponentProps<'div'>) {
  const { open } = useSidebar();

  const [showTrigger, setShowTrigger] = useState(false);

  return (
    <div
      className={cn('flex justify-center items-center', className)}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        setShowTrigger(true);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        setShowTrigger(false);
      }}
      {...props}
    >
      {showTrigger && !open ? <UiSidebarTrigger /> : children}
    </div>
  );
}
