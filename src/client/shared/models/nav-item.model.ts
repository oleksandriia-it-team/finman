export interface NavItemModel {
  route: string;
  name: string;
  icon: string;
  activeRoutes?: string[];
}

export interface SidebarItemModel extends NavItemModel {
  innerItems?: NavItemModel[];
}
