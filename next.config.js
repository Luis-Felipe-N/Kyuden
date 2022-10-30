/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['animesonline.cc', 'media.kitsu.io'],
<<<<<<< HEAD
    writeToCacheDir: false,
  },
}


=======
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

>>>>>>> 91e0b26dd14befebaf5fd5e617dc93f735ac6f93
module.exports = nextConfig
