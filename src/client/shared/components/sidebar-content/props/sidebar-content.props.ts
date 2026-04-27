import { type ComponentProps } from 'react';
import { type SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { type UiSidebarContent } from '@frontend/ui/ui-sidebar/ui-sidebar-content';

export interface SidebarContentProps extends ComponentProps<typeof UiSidebarContent> {
  routes: SidebarItemModel[];
}
