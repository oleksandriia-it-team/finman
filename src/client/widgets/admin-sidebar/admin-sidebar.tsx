'use client';

import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { AdminSidebarContent } from './admin-sidebar-content';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { LogoInverseSvg } from '@frontend/shared/svg/logo-inverse-svg';

export function AdminSidebar() {
  const userName = useAuthorizedUser()?.name ?? 'Користувач';

  return (
    <UiSidebarProvider>
      <UiSidebar
        collapsible="icon"
        colorVariant="blue"
      >
        <UiSidebarHeader className="flex flex-col gap-2">
          <div className="flex">
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
          </div>

          <div className="flex w-full items-center group-data-[collapsible=icon]:w-full">
            <UiSvgIcon
              name="person-circle"
              className="!text-xl text-sidebar-foreground w-9"
            />

            <span className="text-sm font-medium text-sidebar-foreground group-data-[collapsible=icon]:hidden">
              {userName}
            </span>
          </div>
        </UiSidebarHeader>

        <AdminSidebarContent userName={userName} />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
