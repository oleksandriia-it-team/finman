'use client';

import './styles/header.scss';
import { DateFormatType } from '../../shared/enums/date-type.enum';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInformation } from '../../entities/user-information/use-user-information.store';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useShallow } from 'zustand/react/shallow';
import { UITransformDate } from '@frontend/ui/ui-transform-date/ui-transform-date';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import Link from 'next/link';

/**
 * Header
 *
 * A header component displaying the current date and a theme toggle button.
 * The theme button switches between 'light' and 'dark' modes using Redux state.
 *
 * @component
 *
 * @example
 * <Header />
 *
 */
export default function Header() {
  const router = useRouter();

  const { setUserInformation, isLoggedIn, mode } = useUserInformation(
    useShallow((state) => ({
      setUserInformation: state.setUserInformation,
      isLoggedIn: !!state.userInformation?.userName,
      mode: state.userInformation?.mode ?? ThemeEnum.Light,
    })),
  );

  const isLight = useMemo(() => mode === ThemeEnum.Light, [mode]);

  const today = useMemo(() => new Date(), []);

  const currentDateEl = (
    <UITransformDate
      date={today}
      type={DateFormatType.LongWithYear}
    />
  );

  const authButtonEl = (
    <>
      {isLight && (
        <UiIconButton
          isRoundedFull={false}
          isOutlined={false}
          icon="brightness-high-fill"
          size="sm"
          variant="default"
          bgNone
          onClick={() =>
            setUserInformation({
              mode: ThemeEnum.Dark,
            })
          }
        />
      )}

      {!isLight && (
        <UiIconButton
          isRoundedFull={false}
          isOutlined={false}
          icon="moon-fill"
          size="sm"
          variant="default"
          bgNone
          onClick={() =>
            setUserInformation({
              mode: ThemeEnum.Light,
            })
          }
        />
      )}

      {isLoggedIn && (
        <UiIconButton
          isRoundedFull={false}
          isOutlined={false}
          icon="gear"
          size="sm"
          variant="default"
          bgNone
          onClick={() => router.push('pages/setting-page')}
        />
      )}
    </>
  );

  return (
    <nav className="navbar navbar-light bg-primary px-3 py-2 flex justify-between items-center">
      <UiButton
        asChild
        variant="default"
        bgNone
      >
        <Link
          href="/"
          className="no-underline"
        >
          Finman - Твій фінансовий рятівник
        </Link>
      </UiButton>

      <div className="header-buttons text-primary-foreground">
        {currentDateEl}
        {authButtonEl}
      </div>
    </nav>
  );
}
