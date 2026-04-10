import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { FinSidebarContent } from '@frontend/components/sidebar-content/fin-sidebar-content';
import { SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import Image from 'next/image';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';

const routes: SidebarItemModel[] = [
  {
    route: '/',
    name: 'Головна',
    icon: 'house',
    innerItems: [],
  },
  {
    icon: 'pie-chart',
    name: 'Планування',
    route: '/budget',
    innerItems: [
      {
        icon: 'coin',
        name: 'Регулярні операції',
        route: '/regular-operations',
      },
      {
        icon: 'coin',
        name: 'Бюджетні плани',
        route: '/plans',
      },
    ],
  },
  {
    icon: 'graph-up-arrow',
    name: 'Аналітика',
    route: '/analytics',
    innerItems: [],
  },
  {
    icon: 'person',
    name: 'Профіль',
    route: '/settings',
    innerItems: [],
  },
];

export function ProfileSidebar() {
  return (
    <UiSidebarProvider>
      <UiSidebar collapsible="icon">
        <UiSidebarHeader>
          <div className="flex gap-1 flex-1">
            <UiSidebarHeaderIcon className="size-6 group-data-[collapsible=icon]:w-full">
              <Image
                width="24"
                height="20"
                src="/logo/finman-icon.png"
                alt="finman logo"
              />
            </UiSidebarHeaderIcon>

            <UiSidebarHeaderTitle>Finman</UiSidebarHeaderTitle>
          </div>

          <UiSidebarTrigger hideOnCollapse />
        </UiSidebarHeader>

        <UiSeparator />

        <FinSidebarContent routes={routes} />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
