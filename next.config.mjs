/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
        'automatic-system-q77qwg4w4g4jc4vr6-3000.app.github.dev'
      ],
    },
  },
}

export default nextConfig
