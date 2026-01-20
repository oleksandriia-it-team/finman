'use client';

import './styles/header.component.scss';

import TransformDate from '../../shared/сomponents/transform-date/transform-date';
import { DateFormatType } from '../../shared/enums/date-type.enum';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInformation } from '../../entities/user-information/use-user-information.store';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { useShallow } from 'zustand/react/shallow';

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
 * @remarks
 * Uses `Toolbar` and `Button` components from PrimeReact.
 * The current theme mode is read from Redux store, and dispatch updates it.
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

  const today = useMemo(() => new Date(), []);

  const start = (
    <TransformDate
      date={today}
      type={DateFormatType.LongWithYear}
    />
  );

  const end = (
    <div className={'header-buttons'}>
      <button
        className={'theme-button btn btn-danger'}
        onClick={() =>
          setUserInformation({
            mode: mode === ThemeEnum.Light ? ThemeEnum.Dark : ThemeEnum.Light,
          })
        }
      />
      {isLoggedIn && (
        <button
          className={'setting-button btn btn-danger'}
          onClick={() => router.push('pages/setting-page')}
        />
      )}
    </div>
  );
  return (
    <>
      <div className={'w-screen flex gap-2 justify-between custom-toolbar'}>
        {start}
        {end}
      </div>
    </>
  );
}
