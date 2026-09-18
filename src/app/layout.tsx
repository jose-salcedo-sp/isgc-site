import type { Metadata } from "next";
import { OrganizationJsonLd } from "next-seo";

import { SiteMotion } from "@/components/site-motion";
import { org, siteUrl } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description:
    "Conoce la carrera de Ingeniería en Sistemas y Gráficas Computacionales de la Universidad Panamericana Guadalajara.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    locale: "es_MX",
    siteName: "ISGC",
    type: "website",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
    },
    index: true,
  },
  title: {
    default: "ISGC | Ingeniería en Sistemas y Gráficas Computacionales",
    template: "%s | ISGC",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="es">
    <body>
      <OrganizationJsonLd
        address={{
          addressCountry: "MX",
          addressLocality: "Zapopan",
          addressRegion: "Jalisco",
          postalCode: "45010",
          streetAddress: org.address,
        }}
        contactPoint={{
          contactType: "Coordinación académica",
          email: org.coordination.email,
        }}
        description={org.summary}
        logo={`${siteUrl}/isgc-logo-embedded.png`}
        name={org.name}
        url={siteUrl}
      />
      {children}
      <SiteMotion />
    </body>
  </html>
);

export default RootLayout;
