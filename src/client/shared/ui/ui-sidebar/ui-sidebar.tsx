'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';
import { UiSheet, UiSheetContent, UiSheetDescription, UiSheetHeader, UiSheetTitle } from '@frontend/ui/ui-sheet';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './ui-sidebar-provider';

import './styles/sidebar-styles.scss';

export function UiSidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn('sidebar', className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <UiSheet
        open={openMobile}
        onOpenChange={setOpenMobile}
        {...props}
      >
        <UiSheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <UiSheetHeader className="sr-only">
            <UiSheetTitle>Sidebar</UiSheetTitle>
            <UiSheetDescription>Displays the mobile sidebar.</UiSheetDescription>
          </UiSheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </UiSheetContent>
      </UiSheet>
    );
  }

  return (
    <div
      className="group peer sidebar-wrapper"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className="sidebar-gap"
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        data-variant={variant}
        className={cn('sidebar-container', className)}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="sidebar-inner"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
