import { ComponentProps } from 'react';
import { SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';

export interface SidebarContentProps extends ComponentProps<typeof UiSidebarContent> {
  routes: SidebarItemModel[];
}
