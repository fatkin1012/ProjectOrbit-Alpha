import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  transpilePackages: [
    "features-sap-playbook",
    "features-project",
    "features-finance"
  ]
};

export default nextConfig;
