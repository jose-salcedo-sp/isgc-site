import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { ProjectCard } from "@/components/project-card";
import { getDictionary } from "@/lib/dictionary";
import { fill, hasLocale } from "@/lib/i18n";
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
  return pageMetadata(lang, "/proyectos", getDictionary(lang));
};

const ProyectosPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.proyectos;

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        chapters={dict.chapters.proyectos}
        crumb={{ name: copy.crumb, path: "/proyectos" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection>
        <SectionHeading
          title={copy.exploreTitle}
          description={copy.exploreDescription}
        />
        <div className="grid gap-6 md:grid-cols-2">
          {dict.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </PageSection>
      <PageSection tone="marfil" id="media-lab">
        <SectionHeading
          title={copy.archiveTitle}
          description={copy.archiveDescription}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {dict.mediaLab.map((item) => (
            <article
              key={`${item.title}-${item.date}`}
              className="rounded-card shadow-soft/50 bg-white p-6"
            >
              <h3 className="text-grafito font-serif text-2xl">{item.title}</h3>
              <p className="text-piedra mt-4">
                {fill(copy.realized, { date: item.date })}
              </p>
            </article>
          ))}
        </div>
        <p className="text-piedra mt-7 max-w-2xl">{copy.archiveNote}</p>
      </PageSection>
      <PageSection>
        <div className="rounded-card bg-white p-8 sm:p-10">
          <h2 className="text-grafito font-serif text-4xl">
            {copy.shareTitle}
          </h2>
          <p className="text-piedra mt-4 max-w-2xl text-lg">{copy.shareText}</p>
          <a
            href={`mailto:${org.coordinationEmail}?subject=${encodeURIComponent(copy.shareSubject)}`}
            className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
          >
            {copy.shareCta} ↗
          </a>
        </div>
      </PageSection>
    </PageFrame>
  );
};

export default ProyectosPage;
