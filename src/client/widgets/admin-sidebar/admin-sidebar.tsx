'use client';

import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { UiSidebarSeparator } from '@frontend/ui/ui-sidebar/ui-sidebar-separator';
import { AdminSidebarContent } from './admin-sidebar-content';
import { LogoInverseSvg } from '@frontend/shared/svg/logo-inverse-svg';

export function AdminSidebar() {
  return (
    <UiSidebarProvider>
      <UiSidebar
        collapsible="icon"
        className="[--sidebar:var(--primary)] [--sidebar-foreground:var(--primary-foreground)] [--sidebar-accent:rgb(255_255_255_/_0.16)] [--sidebar-accent-foreground:var(--primary-foreground)] [--sidebar-border:rgb(255_255_255_/_0.22)] [--sidebar-ring:var(--primary-foreground)] [--muted:rgb(255_255_255_/_0.2)] [--muted-foreground:var(--primary-foreground)]"
      >
        <UiSidebarHeader>
          <div className="flex gap-1 flex-1 items-center">
            <UiSidebarHeaderIcon className="size-9 group-data-[collapsible=icon]:w-full">
              <LogoInverseSvg
                width={28}
                height={28}
              />
            </UiSidebarHeaderIcon>

            <UiSidebarHeaderTitle>Finman</UiSidebarHeaderTitle>
          </div>

          <UiSidebarTrigger hideOnCollapse />
        </UiSidebarHeader>

        <UiSidebarSeparator />

        <AdminSidebarContent />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
