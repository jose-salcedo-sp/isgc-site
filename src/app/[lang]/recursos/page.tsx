import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StudentResourceSearch } from "@/components/home-interactions";
import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { studentResources } from "@/content/site-content";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { org } from "@/lib/site";

export const revalidate = 3600;

const featuredIds = new Set(["treasury", "kardex", "school-services"]);
const featuredResources = studentResources.filter((resource) =>
  featuredIds.has(resource.id)
);
const hubResources = studentResources.filter(
  (resource) => !featuredIds.has(resource.id)
);

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/recursos", getDictionary(lang));
};

const RecursosPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.alumnos;
  const resourceCopy = Object.fromEntries(
    dict.resources.items.map((item) => [item.id, item])
  );

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        chapters={dict.chapters.alumnos}
        crumb={{ name: copy.crumb, path: "/recursos" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection tone="marfil">
        <SectionHeading title={copy.quickTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {featuredResources.map((resource) => (
            <a
              key={resource.id}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-card shadow-soft/50 bg-white p-6 transition hover:-translate-y-1"
            >
              <h3 className="text-grafito font-serif text-2xl">
                {resourceCopy[resource.id]?.label}
              </h3>
              <p className="text-piedra mt-3">
                {resourceCopy[resource.id]?.description}
              </p>
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
          resources={hubResources}
        />
      </PageSection>
      <PageSection tone="marfil">
        <article className="rounded-card bg-tinto p-7 text-white sm:p-9 md:flex md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl">{copy.coordTitle}</h2>
            <p className="mt-4 text-white/80">{copy.coordText}</p>
          </div>
          <a
            href={`mailto:${org.coordinationEmail}`}
            className="text-dorado mt-6 inline-flex shrink-0 font-bold underline underline-offset-4 md:mt-0"
          >
            {org.coordinationEmail} ↗
          </a>
        </article>
      </PageSection>
    </PageFrame>
  );
};

export default RecursosPage;
