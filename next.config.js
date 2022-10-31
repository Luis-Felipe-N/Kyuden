/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['animesonline.cc', 'media.kitsu.io'],
    disableStaticImages: true
  },
}


module.exports = nextConfig
