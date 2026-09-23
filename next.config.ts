import type { NextConfig } from "next";

/**
 * Baseline security headers applied to every response.
 * Deliberately no Content-Security-Policy here: the site loads Google Fonts
 * and Cloudinary images and uses inline styles, so a CSP needs to be authored
 * and tested against the real pages rather than guessed at.
 */
const securityHeaders = [
  // Stop the site being framed by another origin (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Do not let browsers second-guess declared content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin only when leaving the site, never the full path.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here needs these device APIs.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Force HTTPS for two years once the site has been visited.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

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
  // Do not advertise the framework version.
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The admin is private; keep it out of search results even if linked.
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
