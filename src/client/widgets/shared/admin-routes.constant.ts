import { type SidebarItemModel } from '@frontend/shared/models/nav-item.model';

export const adminNavRoutes: SidebarItemModel[] = [
  {
    route: '/admin/lookups/countries',
    name: 'Країни та локалі',
    icon: 'globe',
    innerItems: [],
  },
  {
    route: '/admin/lookups/currencies',
    name: 'Валюти',
    icon: 'coin',
    innerItems: [],
  },
];
