import { type SidebarContentProps } from '@frontend/components/sidebar-content/props/sidebar-content.props';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';
import { UiSidebarGroup } from '@frontend/ui/ui-sidebar/ui-sidebar-group';
import { UiSidebarGroupContent } from '@frontend/ui/ui-sidebar/ui-sidebar-group-content';
import { UiSidebarMenu } from '@frontend/ui/ui-sidebar/ui-sidebar-menu';
import { UiSidebarMenuButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-button';
import { UiSidebarMenuSub } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-sub';
import { UiSidebarMenuSubItem } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-sub-item';
import { UiSidebarMenuSubButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-sub-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@frontend/shared/utils/cn.util';
import { useGetActiveRoute } from '@frontend/shared/hooks/get-active-route/get-active-route.hook';

export function FinSidebarContent({ routes, ...props }: SidebarContentProps) {
  const pathname = usePathname();

  const activeRoute = useGetActiveRoute(routes);

  return (
    <UiSidebarContent {...props}>
      {routes.map((route, index) => {
        return (
          <UiSidebarGroup key={index}>
            <UiSidebarGroupContent>
              <UiSidebarMenu>
                <UiSidebarMenuButton
                  tooltip={route.name}
                  isActive={activeRoute === route}
                  asChild
                >
                  <Link
                    href={route.route}
                    className={cn(!!route.innerItems?.length && 'pointer-events-none')}
                  >
                    <UiSvgIcon
                      name={route.icon}
                      size="default"
                    />
                    {route.name}
                  </Link>
                </UiSidebarMenuButton>

                {!!route.innerItems?.length && (
                  <UiSidebarMenuSub>
                    {route.innerItems.map((item, index) => {
                      const path = route.route + item.route;

                      return (
                        <UiSidebarMenuSubItem key={index}>
                          <UiSidebarMenuSubButton
                            isActive={pathname === path}
                            asChild
                          >
                            <Link href={path}>
                              <UiSvgIcon
                                name={item.icon}
                                size="sm"
                              />
                              {item.name}
                            </Link>
                          </UiSidebarMenuSubButton>
                        </UiSidebarMenuSubItem>
                      );
                    })}
                  </UiSidebarMenuSub>
                )}
              </UiSidebarMenu>
            </UiSidebarGroupContent>
          </UiSidebarGroup>
        );
      })}
    </UiSidebarContent>
  );
}
