import type { Metadata } from "next";
import localFont from "next/font/local";

import { JsonLd } from "@/components/seo/json-ld";
import { SiteMotion } from "@/components/site-motion";
import { externalLinks } from "@/content/site-content";
import { org, siteUrl, universityUrl } from "@/lib/site";

import "./globals.css";

const satoshi = localFont({
  display: "swap",
  src: [
    { path: "../fonts/Satoshi-400.woff2", style: "normal", weight: "400" },
    { path: "../fonts/Satoshi-500.woff2", style: "normal", weight: "500" },
    { path: "../fonts/Satoshi-700.woff2", style: "normal", weight: "700" },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  description:
    "Conoce la Ingeniería en Sistemas y Gráficas Computacionales en la Universidad Panamericana Guadalajara: software, datos, gráficas y proyectos aplicados.",
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
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html className={satoshi.variable} lang="es-MX">
    <body className={satoshi.className}>
      <a
        href="#contenido"
        className="text-grafito sr-only bg-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:px-4 focus:py-2"
      >
        Saltar al contenido
      </a>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollegeOrUniversity",
          address: {
            "@type": "PostalAddress",
            addressCountry: "MX",
            addressLocality: "Zapopan",
            addressRegion: "Jalisco",
            postalCode: "45010",
            streetAddress: org.address,
          },
          department: {
            "@type": "EducationalOrganization",
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Coordinación académica",
              email: org.coordination.email,
            },
            description: org.summary,
            logo: `${siteUrl}/isgc-logo-embedded.png`,
            name: org.name,
            sameAs: [externalLinks.instagram, externalLinks.facebook],
            url: siteUrl,
          },
          name: org.campus,
          url: universityUrl,
        }}
      />
      {children}
      <SiteMotion />
    </body>
  </html>
);

export default RootLayout;
