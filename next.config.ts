import type { NextConfig } from "next";
import "./src/lib/env/clientEnv";
import "./src/lib/env/serverEnv";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
