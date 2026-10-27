import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqAccordion } from "@/components/home-interactions";
import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import { externalLinks } from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { org } from "@/lib/site";

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/aspirantes", getDictionary(lang));
};

const AspirantesPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.aspirantes;

  return (
    <PageFrame dict={dict} locale={lang}>
      <FaqJsonLd items={dict.faqs.aspirantes} />
      <PageIntro
        crumb={{ name: copy.crumb, path: "/aspirantes" }}
        description={copy.description}
        dict={dict}
        locale={lang}
        title={copy.title}
      >
        {/* The opening is the path itself: on load each number rises and
            its stretch of path draws, one step after another (CSS). */}
        <div className="mt-16 border-t border-white/20 pt-12 sm:mt-20">
          <h2 className="text-3xl sm:text-4xl">{copy.processTitle}</h2>
          <p className="mt-3 max-w-2xl text-white/80">
            {copy.processDescription}
          </p>
          <ol
            className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0"
            data-reveal="off"
          >
            {copy.steps.map((step, index) => (
              <li key={step.title} className="lg:pr-8">
                <span
                  className="path-number block text-7xl leading-none font-bold tracking-[-0.06em] text-[#e2c58f] tabular-nums sm:text-8xl"
                  style={{ animationDelay: `${0.5 + index * 0.25}s` }}
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span
                  className="path-line relative mt-6 block h-px bg-white/30"
                  style={{ animationDelay: `${0.75 + index * 0.25}s` }}
                  aria-hidden="true"
                >
                  <span className="absolute -top-[4px] left-0 size-[9px] rounded-full bg-[#e2c58f]" />
                </span>
                <div
                  className="path-text"
                  style={{ animationDelay: `${0.85 + index * 0.25}s` }}
                >
                  <h3 className="mt-6 text-2xl">{step.title}</h3>
                  <p className="mt-2 text-lg text-white/80">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={externalLinks.admissions}
            target="_blank"
            rel="noreferrer"
            className="text-tinto hover:bg-marfil mt-14 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 font-bold"
            data-magnetic
          >
            {copy.admissionsCta} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </PageIntro>
      <section className="bg-grafito py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-300 gap-8 px-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16 lg:px-6">
          <h2 className="text-5xl leading-[1.02] tracking-[-0.045em] sm:text-7xl">
            {copy.askTitle}
          </h2>
          <div>
            <p className="text-lg text-white/75">{copy.askText}</p>
            <a
              href={`mailto:${org.coordinationEmail}`}
              className="mt-5 text-2xl font-bold break-all text-[#e2c58f] sm:text-3xl"
            >
              <span className="underline decoration-2 underline-offset-8">
                {org.coordinationEmail}
              </span>{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <PageSection>
        <SectionHeading title={copy.aidTitle} />
        <div className="divide-grafito/15 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x">
          <article className="md:pr-12">
            <h3 className="text-grafito text-3xl sm:text-4xl">
              {copy.aidCardTitle}
            </h3>
            <p className="text-piedra mt-4 max-w-md text-lg">
              {copy.aidCardText}
            </p>
            <div className="mt-6">
              <ExternalLink href={externalLinks.scholarships}>
                {copy.aidCta}
              </ExternalLink>
            </div>
          </article>
          <article className="md:pl-12">
            <h3 className="text-grafito text-3xl sm:text-4xl">
              {copy.visitTitle}
            </h3>
            <p className="text-piedra mt-4 max-w-md text-lg">
              {copy.visitText}
            </p>
            <div className="mt-6">
              <ExternalLink href={externalLinks.campusMap}>
                {copy.visitCta}
              </ExternalLink>
            </div>
          </article>
        </div>
      </PageSection>
      <PageSection id="faq" tone="marfil">
        <SectionHeading title={copy.faqTitle} />
        <FaqAccordion
          groups={[{ items: dict.faqs.aspirantes, title: copy.faqGroup }]}
        />
      </PageSection>
    </PageFrame>
  );
};

export default AspirantesPage;
