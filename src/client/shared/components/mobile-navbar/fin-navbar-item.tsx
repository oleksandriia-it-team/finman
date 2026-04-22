import { type MobileNavbarItem } from '@frontend/components/mobile-navbar/props/mobile-navbar.props';
import Link from 'next/link';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

import './styles/navigation-bar.scss';
import { cn } from '@frontend/shared/utils/cn.util';

export function FinNavigationBarItem({ route, isActive, className, ...props }: MobileNavbarItem) {
  return (
    <UiButton
      size="xxl"
      variant={`${isActive ? 'primary' : 'muted'}`}
      isOutlined
      bgNone
      className={cn('nav-btn', className)}
      borderNone
      asChild
      {...props}
    >
      <Link
        href={route.route}
        className="no-underline"
      >
        <UiSvgIcon
          size="xxl"
          name={route.icon}
        />

        <p className="text-sm">{route.name}</p>
      </Link>
    </UiButton>
  );
}
