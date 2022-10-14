/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['animesonline.cc', 'animesonline.cc/', 'https://animesonline.cc', 'https://animesonline.cc/',  'media.kitsu.io'],
  },
}

module.exports = nextConfig
