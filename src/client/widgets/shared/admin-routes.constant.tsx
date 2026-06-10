'use client';

import { SidebarCountriesSvg } from '@frontend/shared/svg/sidebar-countries-svg';
import { SidebarCurrenciesSvg } from '@frontend/shared/svg/sidebar-currencies-svg';
import type { AdminNavItem } from '@frontend/shared/models/admin-nav-item.model';
import type { SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export function useAdminNavRoutesWindow(): AdminNavItem[] {
  const t = useTranslations('nav');
  return useMemo(
    () => [
      {
        route: '/admin/lookups/countries',
        name: t('countriesLocales'),
        Icon: SidebarCountriesSvg,
      },
      {
        route: '/admin/lookups/currencies',
        name: t('currencies'),
        Icon: SidebarCurrenciesSvg,
      },
      {
        route: '/admin/error-logs',
        name: t('errorLogs'),
        Icon: (
          <UiSvgIcon
            name="exclamation-triangle"
            size="xs"
          />
        ),
      },
    ],
    [t],
  );
}

export function useAdminTopNavItem(): SidebarItemModel {
  const t = useTranslations('nav');
  return useMemo(
    () => ({
      route: '/admin/lookups',
      name: t('adminPanel'),
      icon: 'shield-check',
      innerItems: [],
    }),
    [t],
  );
}
