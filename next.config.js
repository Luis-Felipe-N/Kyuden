/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['animesonline.cc', 'media.kitsu.io'],
    minimumCacheTTL: 99999
  },
}


module.exports = nextConfig
