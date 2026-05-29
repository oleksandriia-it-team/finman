import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import type { NavItemModel, SidebarItemModel } from '@frontend/shared/models/nav-item.model';

interface ActiveRouteResult<T> {
  activeItem: T | undefined;
  activeSubItem: NavItemModel | undefined;
}

type BestMatch<T> = { item: T; subItem?: NavItemModel | undefined; length: number } | null;

type MatchResult<T> = { earlyReturn: ActiveRouteResult<T> | null; bestMatch: BestMatch<T> };

function isSegmentPrefix(current: string, candidate: string): boolean {
  return current === candidate || current.startsWith(`${candidate}/`);
}

function matchSubItems<T extends SidebarItemModel>(
  pathname: string,
  item: T,
  bestMatch: BestMatch<T>,
): { earlyReturn: ActiveRouteResult<T> | null; bestMatch: BestMatch<T> } {
  const sidebarItem = item as SidebarItemModel;

  for (const subItem of sidebarItem.innerItems ?? []) {
    const fullSubRoute = item.route + subItem.route;

    if (pathname === fullSubRoute) {
      return { earlyReturn: { activeItem: item, activeSubItem: subItem }, bestMatch };
    }

    if (isSegmentPrefix(pathname, fullSubRoute) && (!bestMatch || fullSubRoute.length > bestMatch.length)) {
      bestMatch = { item, subItem, length: fullSubRoute.length };
    }
  }

  return { earlyReturn: null, bestMatch };
}

function matchItem<T extends SidebarItemModel | NavItemModel>(
  pathname: string,
  item: T,
  bestMatch: BestMatch<T>,
): { earlyReturn: ActiveRouteResult<T> | null; bestMatch: BestMatch<T> } {
  if (pathname === item.route) {
    return { earlyReturn: { activeItem: item, activeSubItem: undefined }, bestMatch };
  }

  const candidates = [item.route, ...(item.activeRoutes ?? [])];

  for (const candidate of candidates) {
    if (isSegmentPrefix(pathname, candidate) && (!bestMatch || candidate.length > bestMatch.length)) {
      bestMatch = { item, subItem: undefined, length: candidate.length };
    }
  }

  return { earlyReturn: null, bestMatch };
}

export function useGetActiveRoute<T extends SidebarItemModel | NavItemModel>(routes: T[]): ActiveRouteResult<T> {
  const pathname = usePathname();

  return useMemo(() => {
    let bestMatch: BestMatch<T> = null;

    for (const item of routes) {
      const sidebarItem = item as SidebarItemModel;

      if (sidebarItem.innerItems?.length) {
        const subResult: MatchResult<T> = matchSubItems(pathname, item as T & SidebarItemModel, bestMatch);
        if (subResult.earlyReturn) return subResult.earlyReturn;
        bestMatch = subResult.bestMatch;
      }

      const itemResult: MatchResult<T> = matchItem(pathname, item, bestMatch);
      if (itemResult.earlyReturn) return itemResult.earlyReturn;
      bestMatch = itemResult.bestMatch;
    }

    return { activeItem: bestMatch?.item, activeSubItem: bestMatch?.subItem };
  }, [pathname, routes]);
}
