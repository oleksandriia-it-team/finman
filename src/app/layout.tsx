'use client';

import './globals.scss';

import { Provider } from 'react-redux';

import { appStore } from './store';
import { PrimeReactProvider } from 'primereact/api';
import { ChildrenComponentProps } from '../shared/models/component-with-chilren.model';
import LoadThemeComponent from '../shared/сomponents/load-theme.component';
import { InjectContext } from '../shared/contexts/use-inject.context';
import {
  userInformationService,
  userInformationServiceProvider
} from '../data-access/user-information/user-information.service';

export default function MainLayout({ children }: ChildrenComponentProps) {
  const providers = [
    {
      token: userInformationServiceProvider,
      value: userInformationService
    },
  ];

  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <Provider store={ appStore }>
          <PrimeReactProvider>
            <InjectContext.Provider value={ providers }>
              <LoadThemeComponent>
                { children }
              </LoadThemeComponent>
            </InjectContext.Provider>
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}