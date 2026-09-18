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
        chapters={dict.chapters.aspirantes}
        crumb={{ name: copy.crumb, path: "/aspirantes" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection>
        <SectionHeading
          title={copy.processTitle}
          description={copy.processDescription}
        />
        <div className="grid gap-4 md:grid-cols-4">
          {copy.steps.map((step) => (
            <article key={step.title} className="rounded-card bg-marfil p-6">
              <h3 className="text-grafito mt-4 font-serif text-2xl">
                {step.title}
              </h3>
              <p className="text-piedra mt-3">{step.text}</p>
            </article>
          ))}
        </div>
        <a
          href={externalLinks.admissions}
          target="_blank"
          rel="noreferrer"
          className="bg-tinto mt-8 inline-flex rounded-full px-5 py-3 font-bold text-white transition hover:bg-[#70112e]"
        >
          {copy.admissionsCta} ↗
        </a>
      </PageSection>
      <PageSection tone="marfil">
        <SectionHeading
          title={copy.aidTitle}
          description={copy.aidDescription}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-card shadow-soft/50 bg-white p-7">
            <h3 className="text-grafito font-serif text-3xl">
              {copy.aidCardTitle}
            </h3>
            <p className="text-piedra mt-4">{copy.aidCardText}</p>
            <div className="mt-6">
              <ExternalLink href={externalLinks.scholarships}>
                {copy.aidCta}
              </ExternalLink>
            </div>
          </article>
          <article className="rounded-card shadow-soft/50 bg-white p-7">
            <h3 className="text-grafito font-serif text-3xl">
              {copy.visitTitle}
            </h3>
            <p className="text-piedra mt-4">{copy.visitText}</p>
            <div className="mt-6">
              <ExternalLink href={externalLinks.campusMap}>
                {copy.visitCta}
              </ExternalLink>
            </div>
          </article>
        </div>
      </PageSection>
      <PageSection>
        <div className="rounded-card bg-tinto p-8 text-white sm:p-10">
          <h2 className="font-serif text-4xl">{copy.askTitle}</h2>
          <p className="mt-4 max-w-2xl text-white/80">{copy.askText}</p>
          <a
            href={`mailto:${org.coordinationEmail}`}
            className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
          >
            {org.coordinationEmail} ↗
          </a>
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
