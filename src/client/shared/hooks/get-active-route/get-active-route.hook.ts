import { usePathname } from 'next/navigation';
import { NavItemModel, SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { useMemo } from 'react';

/**
 * Returns all routes associated with a nav item, including inner item routes.
 */
function getAllRoutesByNavItem<T extends NavItemModel | SidebarItemModel>(route: T) {
  if ('innerItems' in route && route.innerItems?.length) {
    return [route.route, ...route.innerItems.map((item) => route.route + item.route)];
  }

  return [route.route];
}

/**
 * Returns the active nav/sidebar item based on the current pathname.
 *
 * Exact match takes priority over prefix match.
 * If no exact match is found, returns the first item whose route is a prefix of the current path.
 *
 * @param routes - List of nav or sidebar items to match against.
 * @returns The matched item, or `undefined` if no match found.
 *
 * @example
 * const activeRoute = useGetActiveRoute(sidebarRoutes);
 */
export function useGetActiveRoute<T extends NavItemModel | SidebarItemModel>(routes: T[]): T | undefined {
  const pathname = usePathname();

  return useMemo(() => {
    let currentRoute: T | undefined;
    let bestPrefixLength = -1;
    const isSegmentPrefix = (current: string, candidate: string) =>
      current === candidate || current.startsWith(`${candidate}/`);

    const routeMap = new Map<T, string[]>(routes.map((route) => [route, getAllRoutesByNavItem(route)]));

    for (const [key, paths] of routeMap) {
      if (paths.includes(pathname)) {
        return key;
      } else {
        const matched = paths.filter((path) => isSegmentPrefix(pathname, path));
        const longest = matched.reduce((acc, p) => Math.max(acc, p.length), -1);
        if (longest > bestPrefixLength) {
          bestPrefixLength = longest;
          currentRoute = key;
        }
      }
    }

    return currentRoute;
  }, [pathname, routes]);
}
