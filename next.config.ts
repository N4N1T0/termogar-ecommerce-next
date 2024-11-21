import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: ''
      }
    ]
  },
  experimental: {
    staleTimes: {
      dynamic: 60,
      static: 180
    },
    ppr: true
  }
}

export default nextConfig
