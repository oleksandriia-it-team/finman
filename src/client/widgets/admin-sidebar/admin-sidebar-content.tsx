'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';
import { UiSidebarGroup } from '@frontend/ui/ui-sidebar/ui-sidebar-group';
import { UiSidebarGroupContent } from '@frontend/ui/ui-sidebar/ui-sidebar-group-content';
import { UiSidebarMenu } from '@frontend/ui/ui-sidebar/ui-sidebar-menu';
import { UiSidebarMenuButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-button';
import { UiSidebarMenuItem } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-item';
import { UiSidebarSeparator } from '@frontend/ui/ui-sidebar/ui-sidebar-separator';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { adminNavRoutesWindow } from '@frontend/widgets/shared/admin-routes.constant';

export function AdminSidebarContent() {
  const pathname = usePathname();
  const userName = useAuthorizedUser()?.name ?? 'Користувач';

  return (
    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            <UiSidebarMenuItem>
              <UiSidebarMenuButton
                asChild
                tooltip={userName}
              >
                <Link href="/profile">
                  <UiSvgIcon
                    name="person-circle"
                    className="w-5 h-5"
                  />
                  <span>{userName}</span>
                </Link>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>

      <UiSidebarSeparator />

      <UiSidebarGroup>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            {adminNavRoutesWindow.map((item) => {
              const isActive = pathname.startsWith(item.route);
              const Icon = item.Icon;

              return (
                <UiSidebarMenuItem key={item.route}>
                  <UiSidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.name as string}
                  >
                    <Link href={item.route}>
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
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
