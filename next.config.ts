import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  // ✅ Add this for hosting under /demo/app
  basePath: '/demo/app',
  assetPrefix: '/demo/app',

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
