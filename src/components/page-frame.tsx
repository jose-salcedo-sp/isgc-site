import Link from "next/link";

import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ChapterVisual } from "@/components/site-motion";
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
  <>
    <SiteHeader dict={dict} locale={locale} />
    <main id="contenido">{children}</main>
    <SiteFooter dict={dict} locale={locale} />
  </>
);

export const PageIntro = ({
  chapters,
  crumb,
  description,
  dict,
  lede,
  locale,
  title,
}: {
  chapters: readonly string[];
  crumb: { name: string; path: string };
  description: string;
  dict: Dictionary;
  lede?: string;
  locale: Locale;
  title: string;
}) => (
  <section className="bg-tinto text-white">
    <div className="mx-auto max-w-300 px-5 py-10 sm:py-14 lg:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: localizedPath(locale, "/") },
          { name: crumb.name, path: localizedPath(locale, crumb.path) },
        ]}
      />
      <nav
        aria-label={dict.common.breadcrumb}
        className="mb-6 text-sm text-white/70"
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
          <li aria-current="page" className="text-white">
            {crumb.name}
          </li>
        </ol>
      </nav>
      <h1 className="max-w-4xl font-serif text-3xl leading-tight sm:text-5xl">
        {title}
      </h1>
      {lede ? (
        <p className="mt-5 max-w-2xl text-xl font-medium text-[#e2c58f] sm:text-2xl">
          {lede}
        </p>
      ) : null}
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
        {description}
      </p>
      <ChapterVisual words={chapters} />
    </div>
  </section>
);

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
