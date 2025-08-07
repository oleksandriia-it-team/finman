'use client';

import './styles/globals.scss';
import Header from '../shared/сomponents/header/header';

import { Provider } from 'react-redux';

import { appStore } from './store';
import { PrimeReactProvider } from 'primereact/api';
import { ChildrenComponentProps } from '../shared/models/component-with-chilren.model';
import LoadThemeComponent from '../shared/сomponents/load-theme/load-theme.component';
import ProvideDependencies from '../shared/contexts/use-inject.context';
import {
  UserInformationService,
  userInformationServiceProvider
} from '../data-access/user-information/user-information.service';
import { LocalStorageService, localStorageServiceProvider } from '../data-access/local-storage/local-storage.service';


export default function MainLayout({ children }: ChildrenComponentProps) {
  const localStorageService = new LocalStorageService();
  const userInformationService = new UserInformationService(localStorageService);

  const providers = [
    {
      token: userInformationServiceProvider,
      value: userInformationService
    },
    {
      token: localStorageServiceProvider,
      value: localStorageService
    }
  ];

  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <Provider store={ appStore }>
          <PrimeReactProvider>
            <ProvideDependencies providers={ providers }>
              <LoadThemeComponent>
                <Header />
                { children }
              </LoadThemeComponent>
            </ProvideDependencies>
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  );
}