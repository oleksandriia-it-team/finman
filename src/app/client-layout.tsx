'use client';

import '../client/shared/styles/globals.scss';

import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import InitApplication from './init-application';
import Header from '../client/widgets/header/header';
import LoadStylesComponent from '../client/widgets/load-styles/load-styles.component';
import LoadPopover from './load-popover';

export default function MainLayout({ children }: ChildrenComponentProps) {
  return (
    <LoadStylesComponent>
      <InitApplication>
        <LoadPopover>
          <div className="flex flex-col w-screen h-screen">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </LoadPopover>
      </InitApplication>
    </LoadStylesComponent>
  );
}
