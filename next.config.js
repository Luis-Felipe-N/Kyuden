/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['https://animesonline.cc/', 'media.kitsu.io'],
  },
}

module.exports = nextConfig
