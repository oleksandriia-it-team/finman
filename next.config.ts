import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';
import { isDevMode } from '@common/utils/is-dev-mode.util';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ['pg', 'typeorm'],
  experimental: {
    serverMinification: false,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'mixed-decls'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      // Maybe add in future for better security, but for now we allow all remote images. If you want to restrict to specific hosts, you can uncomment the following patterns:
      // {
      //   protocol: 'https',
      //   hostname: 'i.imgur.com', // Для прямих посилань на картинки
      //   port: '',
      //   pathname: '/**', // Дозволяє будь-які шляхи на цьому хості
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'imgur.com', // На випадок використання основних посилань
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  // Service worker is only generated when running in true production.
  // Mirrors the PROD switch used elsewhere (see users.seeder.ts, EnvConfigConstant.PROD).
  // Set NEXT_PUBLIC_SW=true locally to test PWA offline behaviour in dev.
  disable: process.env.NEXT_PUBLIC_SW !== 'true' && isDevMode(),
  register: true,
  // When a navigation request fails offline, serve the cached root page.
  // @ducanh2912/next-pwa handles navigate fallback at the top-level, not via
  // runtimeCaching — using it there produces a NetworkOnly handler that ignores the cache.
  fallbacks: {
    document: '/',
  },
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /^\/_next\/static\/.*/,
        handler: 'CacheFirst',
        options: { cacheName: 'next-static' },
      },
      {
        urlPattern: /^\/_next\/image\?.*/,
        handler: 'CacheFirst',
        options: { cacheName: 'next-image' },
      },
      {
        urlPattern: /\/(logo|pictures|icons|json)\/.*/,
        handler: 'CacheFirst',
        options: { cacheName: 'static-assets' },
      },
      {
        urlPattern: /\.(?:js|css|woff2?|ttf|otf)$/,
        handler: 'CacheFirst',
        options: { cacheName: 'fonts-and-scripts' },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|webp|ico)$/,
        handler: 'CacheFirst',
        options: { cacheName: 'images' },
      },
    ],
  },
});

export default withPWA(nextConfig);
