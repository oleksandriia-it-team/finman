'use client';

import * as React from 'react';
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from './ui-sidebar-provider';

import './styles/sidebar-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSheet } from '../ui-sheet/ui-sheet';
import { UiSheetContent } from '../ui-sheet/ui-sheet-content';
import { UiSheetHeader } from '../ui-sheet/ui-sheet-header';
import { UiSheetTitle } from '@frontend/ui/ui-sheet/ui-sheet-title';
import { UiSheetDescription } from '@frontend/ui/ui-sheet/ui-sheet-description';

export function UiSidebar({
  side = 'left',
  variant = 'sidebar',
  colorVariant = 'white',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  colorVariant?: 'white' | 'blue';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        data-color-variant={colorVariant}
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
          data-color-variant={colorVariant}
          className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <UiSheetHeader className="sr-only">
            <UiSheetTitle>Панель керування</UiSheetTitle>
            <UiSheetDescription>Відбражається лише на мобільних пристроях</UiSheetDescription>
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
      data-color-variant={colorVariant}
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
        data-color-variant={colorVariant}
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
