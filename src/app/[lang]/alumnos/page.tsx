import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  FaqAccordion,
  StudentResourceSearch,
} from "@/components/home-interactions";
import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import {
  externalLinks,
  getCurrentHomepageEvents,
  quickAccess,
  studentResources,
} from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { org } from "@/lib/site";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/alumnos", getDictionary(lang));
};

const AlumnosPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.alumnos;
  const events = getCurrentHomepageEvents();
  const quickLabels = Object.fromEntries(
    dict.quickAccess.map((item) => [item.id, item.label])
  );

  return (
    <PageFrame dict={dict} locale={lang}>
      <FaqJsonLd items={dict.faqs.alumnos} />
      <PageIntro
        chapters={dict.chapters.alumnos}
        crumb={{ name: copy.crumb, path: "/alumnos" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection>
        <SectionHeading title={copy.eventsTitle} />
        {events.length === 0 && (
          <p className="text-piedra">{copy.eventsEmpty}</p>
        )}
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => {
            const item = dict.events[event.id];
            return (
              <article
                id={event.id}
                key={event.id}
                className="rounded-card bg-marfil p-6"
              >
                <h3 className="text-grafito font-serif text-2xl">
                  {item.title}
                </h3>
                <p className="text-tinto mt-3 font-semibold">{item.date}</p>
                <p className="text-piedra mt-3">{item.text}</p>
              </article>
            );
          })}
        </div>
      </PageSection>
      <PageSection tone="marfil">
        <SectionHeading title={copy.quickTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {quickAccess.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-card shadow-soft/50 bg-white p-6 transition hover:-translate-y-1"
            >
              <h3 className="text-grafito font-serif text-2xl">
                {quickLabels[item.id]}
              </h3>
              <p className="text-piedra mt-3">{dict.resources.direct}</p>
              <span className="text-tinto mt-5 inline-flex font-semibold">
                {dict.resources.open} ↗
              </span>
            </a>
          ))}
        </div>
      </PageSection>
      <PageSection id="recursos">
        <SectionHeading
          title={copy.resourcesTitle}
          description={copy.resourcesDescription}
        />
        <StudentResourceSearch
          dict={dict}
          locale={lang}
          resources={studentResources}
        />
      </PageSection>
      <PageSection tone="marfil">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-card bg-tinto p-7 text-white sm:p-9">
            <h2 className="font-serif text-3xl">{copy.coordTitle}</h2>
            <p className="mt-4 text-white/80">{copy.coordText}</p>
            <a
              href={`mailto:${org.coordinationEmail}`}
              className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
            >
              {org.coordinationEmail} ↗
            </a>
          </article>
          <article className="rounded-card bg-white p-7 sm:p-9">
            <h2 className="text-grafito font-serif text-3xl">
              {copy.regsTitle}
            </h2>
            <p className="text-piedra mt-4">{copy.regsText}</p>
            <a
              href={externalLinks.schoolServices}
              target="_blank"
              rel="noreferrer"
              className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
            >
              {copy.regsCta} ↗
            </a>
          </article>
        </div>
      </PageSection>
      <PageSection id="faq">
        <SectionHeading title={copy.faqTitle} />
        <FaqAccordion
          groups={[{ items: dict.faqs.alumnos, title: copy.faqGroup }]}
        />
      </PageSection>
    </PageFrame>
  );
};

export default AlumnosPage;
