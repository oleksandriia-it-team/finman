'use client';

import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import InitApplication from './init-application';
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
          {children}
        </QueryClientProvider>
      </InitApplication>
    </LoadStylesComponent>
  );
}
