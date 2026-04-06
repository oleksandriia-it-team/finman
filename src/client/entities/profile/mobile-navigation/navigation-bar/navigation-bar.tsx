'use client';

import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import './navigation-bar.scss';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { usePathname, useRouter } from 'next/navigation';
import { buttonsArrayToMap } from '@frontend/entities/profile/mobile-navigation/navigation-bar/buttons-array-to-map';

export function UserMobileNavigationBar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <nav className=" fixed bottom-0 left-0 w-full bg-background flex items-center">
      {buttonsArrayToMap.map((button) => (
        <UiButton
          key={button.id}
          size="xxl"
          variant={`${pathName === button.route ? 'primary' : 'muted'}`}
          isOutlined
          bgNone
          className="nav-btn"
          borderNone
          onClick={() => {
            router.push(button.route);
          }}
        >
          <UiSvgIcon
            size="xxl"
            name={button.icon}
          />
          <p className="text-sm">{button.label}</p>
        </UiButton>
      ))}
      <UiIconButton
        bgNone={false}
        isOutlined={false}
        className="absolute -top-6 right-1/2 translate-x-1/2"
        size="4xl"
        variant="primary"
        icon="plus"
      />
    </nav>
  );
}
