'use client';

import { Toolbar } from 'primereact/toolbar';
import {Button} from 'primereact/button';
import './styles/header.component.scss';
import 'primeicons/primeicons.css';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxStateActions, ReduxStore, UseDispatch } from '../../models/store.model';


export default function Header(){

  const dispatch: UseDispatch = useDispatch() as UseDispatch;

  const mode: 'light' | 'dark' = useSelector(({ mode }: ReduxStore) => mode);
    
  const today = new Date().toLocaleDateString('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const start = <p>{today}</p>
  const end =  <Button className={'ThemeButton'}
    severity={'help'}
    icon="pi pi-sun"
    size={'large'}
    rounded
    onClick={ () => dispatch({
      type: ReduxStateActions.Mode,
      payload: mode === 'dark' ? 'light' : 'dark'
    }) }>
  </Button>


  return(
    <>
      <div
        className={'w-screen fixed z-1000' }>
        <Toolbar className={'custom-toolbar'} start={start} end={end}/>
      </div>
    </>
  );
}