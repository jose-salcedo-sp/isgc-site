import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { SiteMotion } from "@/components/site-motion";
import { externalLinks } from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, locales } from "@/lib/i18n";
import type { LocaleLayoutProps, LocaleParams } from "@/lib/i18n";
import { org, siteUrl, universityUrl } from "@/lib/site";

import "../globals.css";

const satoshi = localFont({
  display: "swap",
  src: [
    { path: "../../fonts/Satoshi-400.woff2", style: "normal", weight: "400" },
    { path: "../../fonts/Satoshi-500.woff2", style: "normal", weight: "500" },
    { path: "../../fonts/Satoshi-700.woff2", style: "normal", weight: "700" },
  ],
  variable: "--font-satoshi",
});

export const dynamicParams = false;

export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  const dict = getDictionary(lang);
  return {
    description: dict.pages.home.meta.description,
    openGraph: {
      locale: dict.ogLocale,
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
      default: dict.meta.titleDefault,
      template: dict.meta.titleTemplate,
    },
    twitter: {
      card: "summary_large_image",
    },
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);

  return (
    <html className={satoshi.variable} lang={dict.htmlLang}>
      <body className={satoshi.className}>
        <a
          href="#contenido"
          className="text-grafito sr-only bg-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:px-4 focus:py-2"
        >
          {dict.common.skipToContent}
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
                contactType: dict.seo.contactType,
                email: org.coordinationEmail,
              },
              description: dict.seo.departmentDescription,
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default LocaleLayout;
