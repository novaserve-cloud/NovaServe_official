import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure Next.js roots to this project directory
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

