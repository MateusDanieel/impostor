import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/impostor",
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
