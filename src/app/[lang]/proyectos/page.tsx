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
        <div className="mt-14 space-y-20 sm:space-y-28">
          {dict.projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} project={project} />
          ))}
        </div>
      </PageSection>
      <section id="archivo" className="bg-grafito py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-300 gap-10 px-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-6">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-5xl leading-none tracking-[-0.045em] sm:text-7xl">
              {copy.archiveTitle}
            </h2>
            <p className="mt-6 max-w-sm text-lg text-white/75">
              {copy.archiveDescription}
            </p>
          </div>
          <ol className="grid border-t border-white/20" data-follow>
            {dict.mediaLab.map((item) => (
              <li
                key={`${item.title}-${item.date}`}
                className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-b border-white/20 py-6 sm:grid-cols-[8rem_1fr] sm:py-8"
              >
                <p className="text-2xl font-bold tracking-[-0.03em] text-[#e2c58f] tabular-nums sm:text-4xl">
                  <span className="sr-only">
                    {fill(copy.realized, { date: item.date })}
                  </span>
                  <span aria-hidden="true">{item.date}</span>
                </p>
                <h3 className="text-2xl leading-tight sm:text-4xl">
                  {item.title}
                </h3>
              </li>
            ))}
          </ol>
        </div>
      </section>
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
