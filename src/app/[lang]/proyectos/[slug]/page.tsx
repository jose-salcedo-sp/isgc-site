import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailView } from "@/components/project-detail-view";
import { getProject, projects } from "@/content/projects";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import { projectMetadata } from "@/lib/page-metadata";

export const dynamicParams = false;

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export const generateStaticParams = () =>
  projects.map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({
  params,
}: ProjectPageProps): Promise<Metadata> => {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  const project = getProject(slug);
  if (!project) {
    return {};
  }
  return projectMetadata(lang, project, getDictionary(lang));
};

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const project = getProject(slug);
  if (!project) {
    notFound();
  }
  const dict = getDictionary(lang);

  return <ProjectDetailView dict={dict} locale={lang} project={project} />;
};

export default ProjectPage;
