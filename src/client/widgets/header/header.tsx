'use client';

import './styles/header.scss';

import TransformDate from '../../shared/сomponents/transform-date/transform-date';
import { DateFormatType } from '../../shared/enums/date-type.enum';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInformation } from '../../entities/user-information/use-user-information.store';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useShallow } from 'zustand/react/shallow';
import Button from '../../shared/сomponents/button/button';
import Link from '../../shared/сomponents/link/link';
import SvgIcon from '../../shared/сomponents/svg-icon/svg-icon';
import IconButton from '../../shared/сomponents/icon-button/icon-button';

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
    <TransformDate
      date={today}
      type={DateFormatType.LongWithYear}
    />
  );

  const authButtonEl = (
    <>
      {isLight && (
        <IconButton
          icon="brightness-high-fill"
          size="large"
          variant="warning"
          className="size-8"
          isOutlined={true}
          onClick={() =>
            setUserInformation({
              mode: ThemeEnum.Dark,
            })
          }
        />
      )}

      {!isLight && (
        <IconButton
          icon="moon-fill"
          size="large"
          variant="info"
          className="size-8"
          isOutlined={true}
          onClick={() =>
            setUserInformation({
              mode: ThemeEnum.Light,
            })
          }
        />
      )}

      {isLoggedIn && (
        <Button
          className="size-8"
          variant="info"
          onClick={() => router.push('pages/setting-page')}
        >
          <SvgIcon
            className="text-3xl"
            name="gear"
          />
        </Button>
      )}
    </>
  );

  return (
    <nav className="navbar navbar-light bg-primary px-3 py-2 flex justify-between items-center">
      <Link
        variant="revert"
        href="/"
        underlined={false}
      >
        Finman - Твій фінансовий рятівник
      </Link>

      <div className="header-buttons text-spell-revert">
        {currentDateEl}
        {authButtonEl}
      </div>
    </nav>
  );
}
