import '@frontend/shared/styles/globals.scss';

import type { Metadata } from 'next';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import { Inter } from 'next/font/google';
import { cn } from '@frontend/shared/utils/cn.util';
import ClientLayout from './client-layout';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  themeColor: '#ffffff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Finman',
  },
  icons: {
    apple: '/icons/apple-touch-icon-180.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export default function Layout({ children }: ChildrenComponentProps) {
  return (
    <html
      lang="en"
      className={cn('font-sans', inter.variable)}
    >
      <body className="w-screen h-screen bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
