import type { NextConfig } from 'next'
import { withAxiom } from 'next-axiom'

const nextConfig: NextConfig = withAxiom({
  output: 'standalone',
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
  }
})

export default nextConfig
