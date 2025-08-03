import { ReduxStore } from '../models/store.model';
import { useSelector } from 'react-redux';
import { useContext, useEffect, useMemo } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { LayoutModel } from '../models/layout.model';

export default function LoadThemeComponent({ children }: LayoutModel) {
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