import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { ProjectGridCard } from "@/components/project-grid-card";
import { projectsSortedByYear } from "@/content/projects";
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
        crumb={{ name: copy.crumb, path: "/proyectos" }}
        description={copy.description}
        dict={dict}
        display
        locale={lang}
        title={copy.title}
        tone="white"
      />
      <PageSection id="explora">
        <SectionHeading
          title={copy.exploreTitle}
          description={copy.exploreDescription}
        />
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {projectsSortedByYear.map((project, index) => (
            <li key={project.slug} className="min-h-0">
              <ProjectGridCard
                dict={dict}
                index={index}
                locale={lang}
                project={project}
              />
            </li>
          ))}
        </ul>
      </PageSection>
      <section id="comparte" className="bg-marfil py-20 sm:py-28">
        <div className="mx-auto grid max-w-300 gap-8 px-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16 lg:px-6">
          <h2 className="text-grafito text-5xl leading-[1.02] tracking-[-0.045em] sm:text-7xl">
            {copy.shareTitle}
          </h2>
          <div>
            <p className="text-piedra text-lg">{copy.shareText}</p>
            <a
              href={`mailto:${org.coordinationEmail}?subject=${encodeURIComponent(copy.shareSubject)}`}
              className="bg-tinto mt-6 inline-flex items-center gap-3 rounded-full px-6 py-3.5 font-bold text-white hover:bg-[#70112e]"
              data-magnetic
            >
              {copy.shareCta} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </PageFrame>
  );
};

export default ProyectosPage;
