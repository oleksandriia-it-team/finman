import { type ComponentProps } from 'react';
import { type SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { type IconSize } from '@frontend/ui/ui-svg-icon/props/svg-icon.props';

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
  size?: IconSize;
  iconSize?: IconSize;
}
