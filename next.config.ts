import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  compress: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
