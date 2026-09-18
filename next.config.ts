import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  // firebase-admin ships native/grpc deps that should not be bundled.
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
