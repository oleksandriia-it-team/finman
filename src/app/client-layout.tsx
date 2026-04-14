'use client';

import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import InitApplication from './init-application';
import LoadStylesComponent from '@frontend/widgets/load-styles/load-styles.component';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadGlobalToast } from './load-global-toast';

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
          <LoadGlobalToast />
          {children}
        </QueryClientProvider>
      </InitApplication>
    </LoadStylesComponent>
  );
}
