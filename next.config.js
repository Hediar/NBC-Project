/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  }
};

module.exports = {
  experimental: {
    serverActions: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    pathname: '/**',
    domains: [
      'www.themoviedb.org',
      'lh3.googleusercontent.com',
      'k.kakaocdn.net',
      'i.ibb.co',
      'image.tmdb.org',
      'aiwjpebjrijveiqokhsn.supabase.co'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
};
