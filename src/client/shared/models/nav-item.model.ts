export interface NavItemModel {
  route: string;
  name: string;
  icon: string;
}

export interface SidebarItemModel extends NavItemModel {
  innerItems: NavItemModel[];
}
