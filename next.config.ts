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
  redirects: () =>
    Promise.resolve([
      {
        destination: "/recursos/:path*",
        permanent: true,
        source: "/alumnos/:path*",
      },
      {
        destination: "/:lang/recursos/:path*",
        permanent: true,
        source: "/:lang/alumnos/:path*",
      },
    ]),
};

export default nextConfig;
