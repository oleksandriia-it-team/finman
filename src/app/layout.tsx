'use client'

import './globals.scss';

import { Provider } from 'react-redux';

import { appStore } from './store';
import { PrimeReactProvider } from 'primereact/api';
import { LayoutModel } from '../shared/models/layout.model';

export default function MainLayout({ children }: LayoutModel) {
  return (
    <html lang="uk">
      <body>
        <Provider store={ appStore }>
          <PrimeReactProvider>
            { children }
          </PrimeReactProvider>
        </Provider>
      </body>
    </html>
  )
}