'use client';

import '@frontend/shared/styles/globals.scss';

import dynamic from 'next/dynamic';
import { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { Inter } from 'next/font/google';
import { cn } from '@frontend/ui/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const ClientLayout = dynamic(() => import('./client-layout'), {
  ssr: false,
});

export default function Layout({ children }: ChildrenComponentProps) {
  return (
    <html
      lang="en"
      className={cn('font-sans', inter.variable)}
    >
      <body className="w-screen h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
