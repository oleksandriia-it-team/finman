'use client';

import { MobileNavbarProps } from '@frontend/components/mobile-navbar/props/mobile-navbar.props';
import { cn } from '@frontend/shared/utils/cn.util';
import { useGetActiveRoute } from '@frontend/shared/hooks/get-active-route/get-active-route.hook';
import { FinNavigationBarItem } from '@frontend/components/mobile-navbar/fin-navbar-item';
import { FinNavbarCenterItem } from '@frontend/components/mobile-navbar/fin-navbar-center-item';

export function FinNavigationBar({ routes, className, centerButton, ...props }: MobileNavbarProps) {
  const activeRoute = useGetActiveRoute(routes);

  return (
    <nav
      className={cn('sticky bottom-0 w-full bg-background border-t border-secondary flex items-center', className)}
      {...props}
    >
      {routes.map((route) => (
        <FinNavigationBarItem
          route={route}
          key={route.name}
          isActive={activeRoute === route}
        />
      ))}

      {!!centerButton && <FinNavbarCenterItem {...centerButton} />}
    </nav>
  );
}
