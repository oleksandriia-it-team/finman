import { ComponentProps } from 'react';
import { SidebarItemModel } from '@frontend/shared/models/nav-item.model';

export interface MobileNavbarProps extends ComponentProps<'nav'> {
  routes: SidebarItemModel[];
  centerButton?: MobileNavbarCenterItem | undefined;
}

export interface MobileNavbarItem extends ComponentProps<'button'> {
  isActive: boolean;
  route: SidebarItemModel;
}

export interface MobileNavbarCenterItem extends ComponentProps<'button'> {
  icon: string;
  url: string;
}
