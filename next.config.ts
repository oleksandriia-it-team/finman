import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ['pg', 'typeorm'],
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

export default nextConfig;
