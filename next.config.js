/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['animesonline.cc', 'media.kitsu.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.animesonline.cc',
      },
      {
        protocol: 'https',
        hostname: 'media.kitsu.io',
      }
    ],
  },
}

module.exports = nextConfig
