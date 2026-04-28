import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';
import type { AdminNavItem } from '@frontend/shared/models/admin-nav-item.model';

export const adminNavRoutesWindow: AdminNavItem[] = [
  {
    route: '/admin/lookups/countries',
    name: 'Країни та локалі',
    Icon: SidebarCountriesSvg,
  },
  {
    route: '/admin/lookups/currencies',
    name: 'Валюти',
    Icon: SidebarCurrenciesSvg,
  },
];
