import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const PageFrame = ({
  children,
  dict,
  locale,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  locale: Locale;
}) => (
  <div className="flex min-h-dvh flex-col">
    <SiteHeader dict={dict} locale={locale} />
    <main id="contenido" className="relative z-1 flex-1 bg-white">
      {children}
    </main>
    <SiteFooter dict={dict} locale={locale} />
  </div>
);

const introTones = {
  grafito: {
    crumb: "text-white/70",
    current: "text-white",
    section: "bg-grafito text-white",
    text: "text-white/80",
  },
  marfil: {
    crumb: "text-piedra",
    current: "text-grafito",
    section: "bg-marfil text-grafito",
    text: "text-piedra",
  },
  tinto: {
    crumb: "text-white/70",
    current: "text-white",
    section: "bg-tinto text-white",
    text: "text-white/80",
  },
  white: {
    crumb: "text-piedra",
    current: "text-grafito",
    section: "bg-white text-grafito",
    text: "text-piedra",
  },
};

/*
 * Every route opens with a breadcrumb, a title and a short description; each
 * page composes the rest so no two openings look alike:
 * - `tone`: background of the opening band.
 * - `display`: oversized title, for short titles.
 * - `aside`: a right-hand column (facts, quick links…).
 * - `children`: content that continues inside the same band (steps, portals…).
 */
export const PageIntro = ({
  aside,
  children,
  crumb,
  description,
  dict,
  display = false,
  locale,
  title,
  tone = "tinto",
}: {
  aside?: React.ReactNode;
  children?: React.ReactNode;
  crumb: { name: string; path: string };
  description: string;
  dict: Dictionary;
  display?: boolean;
  locale: Locale;
  title: string;
  tone?: keyof typeof introTones;
}) => {
  const colors = introTones[tone];
  const titleSize = display
    ? "text-5xl leading-[0.95] tracking-[-0.05em] sm:text-8xl lg:text-9xl"
    : "text-4xl leading-[1.05] tracking-[-0.035em] sm:text-6xl";

  return (
    <section className={colors.section}>
      <div className="mx-auto max-w-300 px-5 pt-8 pb-14 sm:pt-12 sm:pb-20 lg:px-6">
        <BreadcrumbJsonLd
          items={[
            { name: dict.common.home, path: localizedPath(locale, "/") },
            { name: crumb.name, path: localizedPath(locale, crumb.path) },
          ]}
        />
        <nav
          aria-label={dict.common.breadcrumb}
          className={`mb-8 text-sm ${colors.crumb}`}
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={localizedPath(locale, "/")}
                className="underline underline-offset-4"
              >
                {dict.common.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className={colors.current}>
              {crumb.name}
            </li>
          </ol>
        </nav>
        <div
          className={
            aside
              ? "flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
              : ""
          }
        >
          <div className="max-w-5xl min-w-0">
            <h1 className={titleSize} data-intro="0">
              {title}
            </h1>
            <p
              className={`mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${colors.text}`}
              data-intro="1"
            >
              {description}
            </p>
          </div>
          {aside}
        </div>
        {children}
      </div>
    </section>
  );
};

export const PageSection = ({
  children,
  tone = "white",
  id,
}: {
  children: React.ReactNode;
  tone?: "white" | "marfil";
  id?: string;
}) => (
  <section
    id={id}
    className={`${tone === "marfil" ? "bg-marfil" : "bg-white"} py-16 sm:py-20`}
  >
    <div className="mx-auto max-w-300 px-5 lg:px-6">{children}</div>
  </section>
);

export const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="mb-9 max-w-3xl">
    <h2 className="text-grafito font-serif text-4xl leading-tight sm:text-5xl">
      {title}
    </h2>
    {description && <p className="text-piedra mt-4 text-lg">{description}</p>}
  </div>
);

export const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
  >
    {children} ↗
  </a>
);
