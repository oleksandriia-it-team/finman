'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UiGraphic } from '@frontend/shared/ui/ui-graphic/ui-graphic';
import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';
import { UiSidebarFooter } from '@frontend/ui/ui-sidebar/ui-sidebar-footer';
import { UiSidebarMenu } from '@frontend/ui/ui-sidebar/ui-sidebar-menu';
import { UiSidebarMenuItem } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-item';
import { UiSidebarMenuButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-button';
import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';

const LookupNavItems = [
  { label: 'Країни та локалі', href: '/admin/lookups/countries', Icon: SidebarCountriesSvg },
  { label: 'Валюти', href: '/admin/lookups/currencies', Icon: SidebarCurrenciesSvg },
] as const;

function AdminSidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <UiSidebarHeader>
        <UiSidebarMenuButton
          asChild
          className="w-full h-10"
          tooltip="Профіль"
        >
          <Link href="/profile">
            <UiGraphic
              src="https://avatars.dicebear.com/api/initials/admin.svg"
              size={32}
              type="image"
              alt="Користувач"
              className="rounded-full"
            />
            <span className="group-data-[collapsible=icon]:hidden">Main-Admin</span>
          </Link>
        </UiSidebarMenuButton>
      </UiSidebarHeader>

      <UiSidebarContent>
        <UiSidebarMenu>
          {LookupNavItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.Icon;

            return (
              <UiSidebarMenuItem key={item.href}>
                <UiSidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            );
          })}
        </UiSidebarMenu>
      </UiSidebarContent>

      <UiSidebarFooter />
    </>
  );
}

export function AdminSidebar() {
  return (
    <UiSidebarProvider>
      <UiSidebar collapsible="icon">
        <AdminSidebarContent />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
