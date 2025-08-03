'use client'

// TODO delete this test page to change switching mode and check how ui library works later
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useContext, useEffect, useMemo } from 'react';
import { PrimeReactContext } from 'primereact/api';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStateActions, ReduxStore, UseDispatch } from '../shared/models/store.model';


export default function MainPage () {
  const dispatch: UseDispatch = useDispatch() as UseDispatch;

  const { changeTheme } = useContext(PrimeReactContext);

  const mode: 'light' | 'dark' = useSelector(({ mode }: ReduxStore) => mode);

  const theme = useMemo(() => mode === 'light' ? 'lara-light-blue' : 'lara-dark-blue', [mode]);

  useEffect(() => {
    const newTheme = mode === 'light' ? 'lara-light-blue' : 'lara-dark-blue';
    const oldTheme = mode === 'light' ? 'lara-dark-blue' : 'lara-light-blue';

    changeTheme(oldTheme, newTheme, 'theme');
  }, [changeTheme, mode]);

  return <>
    <link id="theme" rel="stylesheet" href={`/themes/${theme}/theme.css`} />

    <div className="flex justify-center items-center h-screen">
      <Button
        label="Warning"
        severity="warning"
        onClick={() => dispatch({
          type: ReduxStateActions.Mode,
          payload: mode === 'dark' ? 'light' : 'dark'
        })}
      />

      <Calendar />
    </div>
  </>
}