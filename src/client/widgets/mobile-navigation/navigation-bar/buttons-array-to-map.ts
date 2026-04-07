interface NavigationBarButton {
  id: number;
  label: string;
  icon: string;
  route: string;
}

export const buttonsArrayToMap: NavigationBarButton[] = [
  {
    id: 1,
    icon: 'house-door',
    label: 'Головна',
    route: '/profile/main',
  },
  {
    id: 2,
    icon: 'pie-chart',
    label: 'Планування',
    route: '/profile/plans',
  },
  {
    id: 3,
    icon: 'graph-up-arrow',
    label: 'Аналітика',
    route: '/profile/analytics',
  },
  {
    id: 4,
    icon: 'person',
    label: 'Профіль',
    route: '/profile/settings',
  },
];
