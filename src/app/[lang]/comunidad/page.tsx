import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import {
  coordination,
  externalLinks,
  faculty,
  homepageEvents,
} from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
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
  return pageMetadata(lang, "/comunidad", getDictionary(lang));
};

const ComunidadPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.comunidad;
  const published = homepageEvents.filter((event) => event.published);

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        chapters={dict.chapters.comunidad}
        crumb={{ name: copy.crumb, path: "/comunidad" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection>
        <SectionHeading title={copy.facultyTitle} />
        <div className="grid gap-4 md:grid-cols-2">
          {faculty.map((person) => {
            const item = dict.faculty[person.id];
            return (
              <article
                key={person.name}
                className="rounded-card bg-marfil shadow-soft/50 p-7"
              >
                <div className="bg-tinto flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl text-white">
                  {person.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <h3 className="text-grafito mt-4 font-serif text-2xl">
                  {person.name}
                </h3>
                <p className="text-tinto mt-1 font-semibold">{item.role}</p>
                <p className="text-piedra mt-2">{item.area}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="text-tinto mt-5 inline-flex text-sm font-semibold underline underline-offset-4"
                >
                  {person.email}
                </a>
              </article>
            );
          })}
        </div>
      </PageSection>
      <PageSection tone="marfil" id="archivo">
        <SectionHeading title={copy.newsTitle} />
        <div className="grid gap-4 md:grid-cols-2">
          {published.map((event) => {
            const item = dict.events[event.id];
            return (
              <article
                id={event.id}
                key={event.id}
                className="rounded-card shadow-soft/50 bg-white p-6"
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
        <p className="text-piedra mt-7">{copy.newsEmpty}</p>
      </PageSection>
      <PageSection>
        <SectionHeading
          title={copy.spacesTitle}
          description={copy.spacesDescription}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {dict.spaces.map((space) => (
            <article key={space.title} className="rounded-card bg-marfil p-6">
              <h3 className="text-grafito font-serif text-2xl">
                {space.title}
              </h3>
              <p className="text-tinto mt-3 font-semibold">{space.location}</p>
              <p className="text-piedra mt-3">{space.text}</p>
            </article>
          ))}
        </div>
        <a
          href={externalLinks.campusMap}
          target="_blank"
          rel="noreferrer"
          className="text-tinto decoration-dorado mt-8 inline-flex font-semibold underline decoration-2 underline-offset-4"
        >
          {copy.mapCta} ↗
        </a>
      </PageSection>
      <PageSection tone="marfil">
        <div className="rounded-card bg-tinto p-8 text-white sm:p-10">
          <h2 className="font-serif text-4xl">{copy.contactTitle}</h2>
          <p className="mt-4 text-white/80">
            {coordination.name} · {copy.coordLocation}
          </p>
          <a
            href={`mailto:${coordination.email}`}
            className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
          >
            {coordination.email} ↗
          </a>
        </div>
      </PageSection>
    </PageFrame>
  );
};

export default ComunidadPage;
