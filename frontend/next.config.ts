import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        pathname: '/**',  // Allows all paths under this domain
      },
    ],
  },
  // Other config options can be added here if needed
};

export default nextConfig;
