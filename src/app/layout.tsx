import type { Metadata } from "next";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) =>
  children;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://isgc-site.vercel.app"
  ),
};

export default RootLayout;
