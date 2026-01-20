'use client';

import '../client/shared/styles/globals.scss';

import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import LoadThemeComponent from '../client/widgets/load-theme/load-theme.component';
import InitApplication from './init-application';
import Header from '../client/widgets/header/header';

export default function MainLayout({ children }: ChildrenComponentProps) {
  return (
    <LoadThemeComponent>
      <InitApplication>
        <div className="flex flex-col w-screen h-screen">
          <Header />
          <div className="flex-1">{children}</div>
        </div>
      </InitApplication>
    </LoadThemeComponent>
  );
}
