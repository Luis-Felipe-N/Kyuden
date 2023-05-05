/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['animesonline.cc', 'media.kitsu.io', 'animesonlinecc.to', 'cdn.myanimelist.net'],
    minimumCacheTTL: 0
  }
}


module.exports = nextConfig
