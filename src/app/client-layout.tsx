'use client';

import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';
import InitApplication from './init-application';
import Header from '../client/widgets/header/header';
import LoadStylesComponent from '../client/widgets/load-styles/load-styles.component';
import LoadPopover from './load-popover';
import LoadToasts from './load-toasts';
import LoadModal from './load-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function MainLayout({ children }: ChildrenComponentProps) {
  return (
    <LoadStylesComponent>
      <InitApplication>
        <QueryClientProvider client={queryClient}>
          <LoadPopover />
          <LoadToasts />
          <LoadModal />

          <div className="flex flex-col w-screen h-screen">
            <Header />
            <div className="flex-1">{children}</div>
          </div>
        </QueryClientProvider>
      </InitApplication>
    </LoadStylesComponent>
  );
}
