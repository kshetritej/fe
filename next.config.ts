import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/api/:path*",
          destination: "https://api.essencetreksnepal.com/api/:path*",
        },
      ];
    }

    return [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.growfore.com",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.summitluxurytreks.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.essencetreksnepal.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
