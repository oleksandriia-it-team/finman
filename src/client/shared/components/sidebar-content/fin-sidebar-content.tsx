import { SidebarContentProps } from '@frontend/components/sidebar-content/props/sidebar-content.props';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';
import { UiSidebarGroup } from '@frontend/ui/ui-sidebar/ui-sidebar-group';
import { UiSidebarGroupContent } from '@frontend/ui/ui-sidebar/ui-sidebar-group-content';
import { UiSidebarMenu } from '@frontend/ui/ui-sidebar/ui-sidebar-menu';
import { UiSidebarMenuButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-button';
import { UiSidebarMenuSub } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-sub';
import { UiSidebarMenuSubItem } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-sub-item';
import { UiSidebarMenuSubButton } from '@frontend/ui/ui-sidebar/ui-sidebar-menu-sub-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

export function FinSidebarContent({ routes, ...props }: SidebarContentProps) {
  return (
    <UiSidebarContent {...props}>
      {routes.map((route, index) => {
        return (
          <UiSidebarGroup key={index}>
            <UiSidebarGroupContent>
              <UiSidebarMenu>
                <UiSidebarMenuButton>
                  <UiSvgIcon
                    name={route.icon}
                    size="default"
                  />
                  {route.name}
                </UiSidebarMenuButton>

                {!!route.innerItems.length && (
                  <UiSidebarMenuSub>
                    {route.innerItems.map((item, index) => {
                      return (
                        <UiSidebarMenuSubItem key={index}>
                          <UiSidebarMenuSubButton>
                            <UiSvgIcon
                              name={item.icon}
                              size="sm"
                            />
                            {item.name}
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
