'use client';

import '../client/shared/styles/globals.scss';

import dynamic from 'next/dynamic';
import { ChildrenComponentProps } from '../client/shared/models/component-with-chilren.model';

const ClientLayout = dynamic(() => import('./client-layout'), {
  ssr: false,
});

export default function Layout({ children }: ChildrenComponentProps) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
