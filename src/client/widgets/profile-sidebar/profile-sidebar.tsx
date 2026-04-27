import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { FinSidebarContent } from '@frontend/components/sidebar-content/fin-sidebar-content';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { UiSidebarSeparator } from '@frontend/ui/ui-sidebar/ui-sidebar-separator';
import { profileNavRoutesWindow } from '@frontend/widgets/shared/profile-routes.constant';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';

export function ProfileSidebar() {
  return (
    <UiSidebarProvider>
      <UiSidebar collapsible="icon">
        <UiSidebarHeader>
          <div className="flex gap-1 flex-1 items-center">
            <UiSidebarHeaderIcon className="size-9 group-data-[collapsible=icon]:w-full">
              <LogoSvg
                width={28}
                height={28}
              />
            </UiSidebarHeaderIcon>

            <UiSidebarHeaderTitle>Finman</UiSidebarHeaderTitle>
          </div>

          <UiSidebarTrigger hideOnCollapse />
        </UiSidebarHeader>

        <UiSidebarSeparator />

        <FinSidebarContent routes={profileNavRoutesWindow} />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
