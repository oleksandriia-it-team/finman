'use client';

import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStateActions, ReduxStore, UseDispatch } from '../shared/models/store.model';


// TODO delete this test page to change switching mode and check how ui library works later
export default function MainPage() {
  const dispatch: UseDispatch = useDispatch() as UseDispatch;

  const mode: 'light' | 'dark' = useSelector(({ mode }: ReduxStore) => mode);

  return (
    <div className="flex justify-center items-center h-screen">
      <Button
        label="Warning"
        severity="warning"
        onClick={ () => dispatch({
          type: ReduxStateActions.Mode,
          payload: mode === 'dark' ? 'light' : 'dark'
        }) }
      />

      <Calendar/>
    </div>
  );


}