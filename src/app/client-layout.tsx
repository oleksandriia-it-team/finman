'use client';

import '../client/shared/styles/globals.scss';

import { Provider } from 'react-redux';

import { appStore } from './store';
import { PrimeReactProvider } from 'primereact/api';
import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import LoadThemeComponent from '../client/shared/сomponents/load-theme/load-theme.component';
import InitApplication from './init-application';
import Header from '../client/shared/сomponents/header/header';

export default function MainLayout({ children }: ChildrenComponentProps) {

  return (
    <Provider store={ appStore }>
      <PrimeReactProvider>
        <LoadThemeComponent>
          <InitApplication>
            <div className="flex flex-col w-screen h-screen">
              <Header/>
              <div className="flex-1">
                { children }
              </div>
            </div>
          </InitApplication>
        </LoadThemeComponent>
      </PrimeReactProvider>
    </Provider>
  );
}