import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  headers: () =>
    Promise.resolve([
      {
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
          { key: "X-Frame-Options", value: "DENY" },
        ],
        source: "/:path*",
      },
    ]),
  reactCompiler: process.env.NODE_ENV === "production",
};

export default nextConfig;
