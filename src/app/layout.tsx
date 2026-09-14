import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "Next.js starter with React Compiler, Ultracite, and React Doctor.",
  title: "Nexus App",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className="antialiased">{children}</body>
  </html>
);
export default RootLayout;
