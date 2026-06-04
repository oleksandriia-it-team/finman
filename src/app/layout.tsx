'use client';

import '@frontend/shared/styles/globals.scss';

import dynamic from 'next/dynamic';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { Inter } from 'next/font/google';
import { cn } from '@frontend/shared/utils/cn.util';

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
      <head>
        <link
          rel="manifest"
          href="/manifest.webmanifest"
        />
        <meta
          name="theme-color"
          content="#ffffff"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/apple-touch-icon-180.png"
        />
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Finman"
        />
      </head>
      <body className="w-screen h-screen bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
