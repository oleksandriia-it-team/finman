'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { type NavItemModel, type SidebarItemModel } from '@frontend/shared/models/nav-item.model';

export function useProfileNavRoutesWindow(): SidebarItemModel[] {
  const t = useTranslations('nav');
  return useMemo(
    () => [
      {
        route: '/profile',
        name: t('home'),
        icon: 'house',
        innerItems: [],
      },
      {
        route: '/profile/budget',
        icon: 'pie-chart',
        name: t('planning'),
        innerItems: [
          {
            icon: 'piggy-bank',
            name: t('budgetPlans'),
            route: '/plans',
          },
          {
            icon: 'coin',
            name: t('regularOperations'),
            route: '/regular-operations',
          },
        ],
      },
      {
        route: '/profile/analytics',
        icon: 'graph-up-arrow',
        name: t('analytics'),
        innerItems: [],
      },
      {
        route: '/profile/settings',
        icon: 'person',
        name: t('profile'),
        innerItems: [],
      },
    ],
    [t],
  );
}

export function useProfileNavRoutesMobile(): NavItemModel[] {
  const t = useTranslations('nav');
  return useMemo(
    () => [
      {
        route: '/profile',
        name: t('home'),
        icon: 'house',
      },
      {
        route: '/profile/budget/plans',
        icon: 'pie-chart',
        name: t('planning'),
        activeRoutes: ['/profile/budget'],
      },
      {
        route: '/profile/analytics',
        icon: 'graph-up-arrow',
        name: t('analytics'),
      },
      {
        route: '/profile/settings',
        icon: 'person',
        name: t('profile'),
      },
    ],
    [t],
  );
}
