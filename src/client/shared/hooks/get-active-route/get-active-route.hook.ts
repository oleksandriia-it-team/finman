import { usePathname } from 'next/navigation';
import { NavItemModel, SidebarItemModel } from '@frontend/shared/models/nav-item.model';
import { useMemo } from 'react';

function getAllRoutesByNavItem<T extends NavItemModel | SidebarItemModel>(route: T) {
  if ('innerItems' in route && route.innerItems?.length) {
    return [route.route, ...route.innerItems.map((item) => route.route + item.route)];
  }

  return [route.route];
}

export function useGetActiveRoute<T extends NavItemModel | SidebarItemModel>(routes: T[]): T | undefined {
  const pathname = usePathname();

  return useMemo(() => {
    let currentRoute: T | undefined = undefined;

    const routeMap = new Map<T, string[]>(routes.map((route) => [route, getAllRoutesByNavItem(route)]));

    for (const [key, paths] of routeMap) {
      if (paths.includes(pathname)) {
        return key;
      } else if (paths.some((path) => pathname.startsWith(path))) {
        currentRoute = key;
      }
    }

    return currentRoute;
  }, [pathname, routes]);
}
