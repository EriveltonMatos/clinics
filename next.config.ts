import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/clinicas",
  output: 'standalone',
  experimental: {
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;