import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  transpilePackages: [
    "features-project",
    "features-finance",
    "features-octocat-hello-world",
    "features-fatkin1012-grand-opening",
    "features-octocat-spoon-knife"
  ]
};

export default nextConfig;
