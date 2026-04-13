import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { FinSidebarContent } from '@frontend/components/sidebar-content/fin-sidebar-content';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import Image from 'next/image';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { UiSidebarSeparator } from '@frontend/ui/ui-sidebar/ui-sidebar-separator';
import { profileNavRoutes } from '@frontend/widgets/shared/profile-routes.constant';

export function ProfileSidebar() {
  return (
    <UiSidebarProvider>
      <UiSidebar collapsible="icon">
        <UiSidebarHeader>
          <div className="flex gap-1 flex-1 items-center">
            <UiSidebarHeaderIcon className="size-9 group-data-[collapsible=icon]:w-full">
              <Image
                width="31"
                height="36"
                src="/logo/finman-icon.png"
                alt="finman logo"
              />
            </UiSidebarHeaderIcon>

            <UiSidebarHeaderTitle>Finman</UiSidebarHeaderTitle>
          </div>

          <UiSidebarTrigger hideOnCollapse />
        </UiSidebarHeader>

        <UiSidebarSeparator />

        <FinSidebarContent routes={profileNavRoutes} />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
