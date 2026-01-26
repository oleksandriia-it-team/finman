import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'mixed-decls'],
  },
  /* config options here */
};

export default nextConfig;
