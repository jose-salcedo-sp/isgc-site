import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { getCurrentHomepageEvents } from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale, localizedPath } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 3600;

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/avisos", getDictionary(lang));
};

const AvisosPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.avisos;
  const events = getCurrentHomepageEvents();

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        chapters={dict.chapters.avisos}
        crumb={{ name: copy.crumb, path: "/avisos" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection tone="marfil">
        <SectionHeading title={copy.eventsTitle} />
        {events.length === 0 ? (
          <article className="rounded-card bg-white p-7 sm:p-9">
            <h2 className="text-grafito font-serif text-3xl">
              {copy.emptyTitle}
            </h2>
            <p className="text-piedra mt-4 max-w-2xl">{copy.emptyText}</p>
          </article>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {events.map((event) => {
              const item = dict.events[event.id];
              return (
                <article
                  id={event.id}
                  key={event.id}
                  className="rounded-card shadow-soft/50 bg-white p-7 sm:p-8"
                >
                  <h2 className="text-grafito font-serif text-3xl">
                    {item.title}
                  </h2>
                  <p className="text-tinto mt-4 font-semibold">{item.date}</p>
                  <p className="text-piedra mt-4">{item.text}</p>
                  <a
                    href={`${localizedPath(lang, "/comunidad")}#${event.id}`}
                    className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
                  >
                    {copy.details} ↗
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </PageSection>
    </PageFrame>
  );
};

export default AvisosPage;
