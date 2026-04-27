import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import type { NavItemModel, SidebarItemModel } from '@frontend/shared/models/nav-item.model';

interface ActiveRouteResult<T> {
  activeItem: T | undefined;
  activeSubItem: NavItemModel | undefined;
}

export function useGetActiveRoute<T extends SidebarItemModel | NavItemModel>(routes: T[]): ActiveRouteResult<T> {
  const pathname = usePathname();

  return useMemo(() => {
    let bestMatch: { item: T; subItem?: NavItemModel | undefined; length: number } | null = null;

    const isSegmentPrefix = (current: string, candidate: string) =>
      current === candidate || current.startsWith(`${candidate}/`);

    for (const item of routes) {
      const sidebarItem = item as SidebarItemModel;

      if (sidebarItem.innerItems?.length) {
        for (const subItem of sidebarItem.innerItems) {
          const fullSubRoute = item.route + subItem.route;

          if (pathname === fullSubRoute) {
            return { activeItem: item, activeSubItem: subItem };
          }

          if (isSegmentPrefix(pathname, fullSubRoute)) {
            if (!bestMatch || fullSubRoute.length > bestMatch.length) {
              bestMatch = { item, subItem, length: fullSubRoute.length };
            }
          }
        }
      }

      if (pathname === item.route) {
        return { activeItem: item, activeSubItem: undefined };
      }

      if (isSegmentPrefix(pathname, item.route)) {
        if (!bestMatch || item.route.length > bestMatch.length) {
          bestMatch = { item, subItem: undefined, length: item.route.length };
        }
      }
    }

    return {
      activeItem: bestMatch?.item,
      activeSubItem: bestMatch?.subItem,
    };
  }, [pathname, routes]);
}
