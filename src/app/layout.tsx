import type { Metadata } from "next";

import { siteUrl } from "@/lib/site";

const defaultSiteUrl = "https://isgc-site.vercel.app";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) =>
  children;

export const metadata: Metadata = {
  metadataBase: URL.canParse(siteUrl)
    ? new URL(siteUrl)
    : new URL(defaultSiteUrl),
};

export default RootLayout;
