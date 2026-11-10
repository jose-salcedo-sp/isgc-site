import Link from "next/link";

import { ExternalLink, PageFrame, PageSection } from "@/components/page-frame";
import { ProjectShowcase } from "@/components/project-showcase";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import type { Project } from "@/content/projects";
import type { Dictionary } from "@/lib/dictionary";
import { localizedPath } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export const ProjectDetailView = ({
  dict,
  locale,
  project,
}: {
  dict: Dictionary;
  locale: Locale;
  project: Project;
}) => {
  const copy = dict.pages.proyectos;
  const proyectosPath = localizedPath(locale, "/proyectos");
  const projectPath = localizedPath(locale, `/proyectos/${project.slug}`);

  return (
    <PageFrame dict={dict} locale={locale}>
      <BreadcrumbJsonLd
        items={[
          { name: dict.common.home, path: localizedPath(locale, "/") },
          { name: copy.crumb, path: proyectosPath },
          { name: project.title, path: projectPath },
        ]}
      />
      <section className="text-grafito bg-white">
        <div className="mx-auto max-w-300 px-5 pt-8 pb-10 sm:pt-12 sm:pb-14 lg:px-6">
          <nav
            aria-label={dict.common.breadcrumb}
            className="text-piedra mb-8 text-sm"
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
              <li>
                <Link
                  href={proyectosPath}
                  className="underline underline-offset-4"
                >
                  {copy.crumb}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-grafito">
                {project.title}
              </li>
            </ol>
          </nav>
          <p className="text-tinto text-sm font-bold tracking-[0.18em] uppercase">
            {project.year} · {copy.cardKind}
          </p>
          <h1 className="text-grafito mt-4 text-4xl leading-[1.05] tracking-[-0.03em] sm:text-6xl">
            {project.title}
          </h1>
          {project.githubUrl ? (
            <p className="mt-5">
              <ExternalLink href={project.githubUrl}>
                {copy.githubRepo}
              </ExternalLink>
            </p>
          ) : null}
        </div>
      </section>
      <PageSection tone="marfil">
        <ProjectShowcase
          cover={project.cover}
          labels={{ result: copy.resultTitle, team: copy.teamTitle }}
          project={project}
          showHeading={false}
        />
      </PageSection>
    </PageFrame>
  );
};
