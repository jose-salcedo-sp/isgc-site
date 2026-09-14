import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
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
};

export default nextConfig;
