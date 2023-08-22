/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  }
};

module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    pathname: '/**',
    domains: ['www.themoviedb.org', 'lh3.googleusercontent.com', 'k.kakaocdn.net'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  }
};
