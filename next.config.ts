import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.growfore.com",
        pathname: "/api/v1/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.hinepaltreks.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
