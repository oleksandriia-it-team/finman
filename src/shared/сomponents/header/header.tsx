'use client';

import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import './styles/header.component.scss';
import 'primeicons/primeicons.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStateActions, ReduxStore, UseDispatch } from '../../models/store.model';
import TransformDate from '../transform-date/transform-date';
import { DateFormatType } from '../../../data-access/date-service/date.service';


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


  const dispatch: UseDispatch = useDispatch() as UseDispatch;

  const mode: 'light' | 'dark' = useSelector(({ mode }: ReduxStore) => mode);

  const today = new Date();


  const start = <TransformDate date={ today } type={ DateFormatType.LongWithYear }></TransformDate>;
  const end = <Button className={ 'theme-button' }
                      severity={ 'help' }
                      icon="pi pi-sun"
                      size={ 'large' }
                      rounded
                      onClick={ () => dispatch({
                        type: ReduxStateActions.Mode,
                        payload: mode === 'dark' ? 'light' : 'dark'
                      }) }>
  </Button>;


  return (
    <>
      <div
        className={ 'w-screen' }>
        <Toolbar className={ 'custom-toolbar' } start={ start } end={ end }/>
      </div>
    </>
  );
}