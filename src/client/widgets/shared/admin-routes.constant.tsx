import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';
import type { AdminNavItem } from '@frontend/shared/models/admin-nav-item.model';
import type { SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

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
  {
    route: '/admin/lookups/error-logs',
    name: 'Логи помилок',
    Icon: <UiSvgIcon name="exclamation-triangle" size="xs" />,
  },
];

export const adminTopNavItem: SidebarItemModel = {
  route: '/admin/lookups',
  name: 'Адмін панель',
  icon: 'shield-check',
  innerItems: [],
};
