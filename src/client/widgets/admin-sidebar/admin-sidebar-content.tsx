'use client';

import { usePathname } from 'next/navigation';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';
import { UiSidebarGroup } from '@frontend/ui/ui-sidebar/ui-sidebar-group';
import { UiSidebarGroupContent } from '@frontend/ui/ui-sidebar/ui-sidebar-group-content';
import { UiSidebarMenu } from '@frontend/ui/ui-sidebar/ui-sidebar-menu';
import { UiSidebarMenuButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-button';
import { UiSidebarMenuItem } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-item';
import Link from 'next/link';
import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';
import { SidebarToggleSvg } from '@frontend/shared/svg/sidebar-toggle-svg';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';

interface AdminNavItem {
  route: string;
  name?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    route: '/profile',
    Icon: SidebarToggleSvg,
  },

  {
    route: '/admin/lookups/countries',
    name: 'Країни та локалі',
    Icon: SidebarCountriesSvg,
  },
  {
    route: '/admin/lookups/currencies',
    name: 'Валюти',
    Icon: SidebarCurrenciesSvg,
  },
];

export function AdminSidebarContent() {
  const userName = useAuthorizedUser()?.name;
  const pathname = usePathname();

  return (
    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.route);
              const Icon = item.Icon;

              return (
                <UiSidebarMenuItem key={item.route}>
                  <UiSidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.name ? item.name : userName}
                  >
                    <Link href={item.route}>
                      <Icon className="w-5 h-5" />
                      <span>{item.name ? item.name : userName}</span>
                    </Link>
                  </UiSidebarMenuButton>
                </UiSidebarMenuItem>
              );
            })}
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
  );
}
