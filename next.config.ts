import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'res.cloudinary.com',
      'cdn.jsdelivr.net',
      'static.vecteezy.com',
      'www.chartjs.org',
      'static.expo.dev'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.chartjs.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.expo.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
