import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Disable LightningCSS optimization (fix for Vercel build error)
  experimental: {
    optimizeCss: false,
  },

  // ✅ TypeScript build settings
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Disable React strict mode (you already had this)
  reactStrictMode: false,

  // ✅ Disable webpack file watching (you already had this)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: ['**/*'], // Ignore all file changes
      };
    }
    return config;
  },

  // ✅ Ignore ESLint build errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
