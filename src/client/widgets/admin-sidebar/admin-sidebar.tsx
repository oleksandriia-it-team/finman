'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UiSidebarProvider } from '@frontend/ui/ui-sidebar/ui-sidebar-provider';
import { UiSidebar } from '@frontend/ui/ui-sidebar/ui-sidebar';
import { UiSidebarHeader } from '@frontend/ui/ui-sidebar/ui-sidebar-header';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';
import { UiSidebarMenu } from '@frontend/ui/ui-sidebar/ui-sidebar-menu';
import { UiSidebarMenuItem } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-item';
import { UiSidebarMenuButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-button';
import { UiSidebarHeaderIcon } from '@frontend/ui/ui-sidebar/ui-sidebar-header-icon';
import { UiSidebarHeaderTitle } from '@frontend/ui/ui-sidebar/ui-sidebar-header-title';
import { UiSidebarTrigger } from '@frontend/ui/ui-sidebar/ui-sidebar-trigger';
import { UiSidebarSeparator } from '@frontend/ui/ui-sidebar/ui-sidebar-separator';
import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';
import { LogoInverseSvg } from '@frontend/shared/svg/logo-inverse-svg';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

const LookupNavItems = [
  { label: 'Країни та локалі', href: '/admin/lookups/countries', Icon: SidebarCountriesSvg },
  { label: 'Валюти', href: '/admin/lookups/currencies', Icon: SidebarCurrenciesSvg },
] as const;

function AdminSidebarContent() {
  const pathname = usePathname();
  const userName = useUserInformation((state) => state.userInformation?.name)?.trim() || 'Користувач';

  return (
    <>
      <UiSidebarHeader>
        <div className="flex gap-1 flex-1 items-center text-primary-foreground">
          <UiSidebarHeaderIcon className="size-9 group-data-[collapsible=icon]:w-full">
            <LogoInverseSvg
              width={28}
              height={28}
              className="[&_path]:stroke-primary-foreground"
            />
          </UiSidebarHeaderIcon>

          <div className="min-w-0">
            <UiSidebarHeaderTitle className="text-primary-foreground">Finman</UiSidebarHeaderTitle>
            <div className="flex items-center gap-1 text-primary-foreground/85 group-data-[collapsible=icon]:hidden">
              <UiSvgIcon
                name="person-circle"
                size="sm"
              />
              <span className="truncate text-xs">{userName}</span>
            </div>
          </div>
        </div>

        <UiSidebarTrigger
          hideOnCollapse
          className="text-primary-foreground hover:text-primary-foreground"
        />
      </UiSidebarHeader>

      <UiSidebarSeparator />

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
                  className="text-primary-foreground/85 hover:text-primary-foreground data-[active=true]:text-primary-foreground"
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
    </>
  );
}

export function AdminSidebar() {
  return (
    <UiSidebarProvider>
      <UiSidebar
        collapsible="icon"
        className="[--sidebar:var(--primary)] [--sidebar-foreground:var(--primary-foreground)] [--sidebar-accent:rgb(255_255_255_/_0.16)] [--sidebar-accent-foreground:var(--primary-foreground)] [--sidebar-border:rgb(255_255_255_/_0.22)] [--sidebar-ring:var(--primary-foreground)] [--muted:rgb(255_255_255_/_0.2)] [--muted-foreground:var(--primary-foreground)]"
      >
        <AdminSidebarContent />
      </UiSidebar>
    </UiSidebarProvider>
  );
}
