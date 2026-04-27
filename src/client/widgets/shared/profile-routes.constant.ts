import { type NavItemModel, type SidebarItemModel } from '@frontend/shared/models/nav-item.model';

export const profileNavRoutesWindow: SidebarItemModel[] = [
  {
    route: '/profile',
    name: 'Головна',
    icon: 'house',
    innerItems: [],
  },
  {
    route: '/profile/budget',
    icon: 'pie-chart',
    name: 'Планування',
    innerItems: [
      {
        icon: 'coin',
        name: 'Регулярні операції',
        route: '/regular-operations',
      },
      {
        icon: 'coin',
        name: 'Бюджетні плани',
        route: '/plans',
      },
    ],
  },
  {
    route: '/profile/analytics',
    icon: 'graph-up-arrow',
    name: 'Аналітика',
    innerItems: [],
  },
  {
    route: '/profile/settings',
    icon: 'person',
    name: 'Профіль',
    innerItems: [],
  },
];

export const profileNavRoutesMobile: NavItemModel[] = [
  {
    route: '/profile',
    name: 'Головна',
    icon: 'house',
  },
  {
    route: '/profile/budget/regular-operations',
    icon: 'pie-chart',
    name: 'Планування',
  },
  {
    route: '/profile/analytics',
    icon: 'graph-up-arrow',
    name: 'Аналітика',
  },
  {
    route: '/profile/settings',
    icon: 'person',
    name: 'Профіль',
  },
];
