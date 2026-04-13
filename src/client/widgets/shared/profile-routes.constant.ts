import { SidebarItemModel } from '@frontend/shared/models/nav-item.model';

export const profileNavRoutes: SidebarItemModel[] = [
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
