'use client';

import { ReduxStore } from '../models/store.model';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useMemo } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { ChildrenComponentProps } from '../models/component-with-chilren.model';

/**
 * LoadThemeComponent dynamically switches the application theme between light and dark modes
 * using PrimeReact's `changeTheme` function and Redux state.
 *
 * It listens to the Redux `mode` value (`light` or `dark`) and updates the theme accordingly
 * by injecting a `<link>` tag and triggering PrimeReact's theme change.
 *
 * @component
 *
 * @param {ChildrenComponentProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the themed layout.
 *
 * @example
 * <LoadThemeComponent>
 *   <App />
 * </LoadThemeComponent>
 */
export default function LoadThemeComponent({ children }: ChildrenComponentProps) {
  const { changeTheme } = useContext(PrimeReactContext);

  const mode: 'light' | 'dark' = useSelector(({ mode }: ReduxStore) => mode);

  const theme = useMemo(() => mode === 'light' ? 'lara-light-blue' : 'lara-dark-blue', [mode]);

  useEffect(() => {
    const newTheme = mode === 'light' ? 'lara-light-blue' : 'lara-dark-blue';
    const oldTheme = mode === 'light' ? 'lara-dark-blue' : 'lara-light-blue';

    changeTheme(oldTheme, newTheme, 'theme');
  }, [changeTheme, mode]);

  return (
    <>
      <link id="theme" rel="stylesheet" href={`/themes/${theme}/theme.css`} />

      { children }
    </>
  )


}
