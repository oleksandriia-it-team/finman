'use client'

import './globals.scss';

import { Provider } from 'react-redux';

import { appStore } from './store';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutModel } from '../shared/models/layout.model';
import LoadThemeComponent from '../shared/сomponents/load-theme.component';

export default function MainLayout({ children }: LayoutModel) {
  return (
    <html lang="uk">
      <body>
        <Provider store={ appStore }>
          <PrimeReactProvider>
            <LoadThemeComponent>
              { children }
            </LoadThemeComponent>
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  )
}