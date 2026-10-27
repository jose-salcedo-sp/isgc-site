import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StudentResourceSearch } from "@/components/home-interactions";
import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { externalLinks, studentResources } from "@/content/site-content";
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
        aside={
          <div
            id="accesos"
            className="w-full shrink-0 lg:w-[26rem]"
            data-intro="2"
          >
            <h2 className="text-2xl">{copy.quickTitle}</h2>
            <ul className="mt-5 border-t border-white/25">
              {featuredResources.map((resource) => (
                <li key={resource.id} className="border-b border-white/25">
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-between gap-4 py-4 text-xl font-bold hover:text-[#e2c58f] sm:text-2xl"
                  >
                    {resourceCopy[resource.id]?.label}
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
        crumb={{ name: copy.crumb, path: "/recursos" }}
        description={copy.description}
        dict={dict}
        locale={lang}
        title={copy.title}
      />
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
      <PageSection tone="marfil" id="coordinacion">
        <h2 className="text-grafito text-4xl sm:text-5xl">{copy.coordTitle}</h2>
        <p className="text-piedra mt-4 max-w-md text-lg">{copy.coordText}</p>
        <a
          href={`mailto:${org.coordinationEmail}`}
          className="text-tinto decoration-dorado mt-6 text-xl font-bold underline decoration-2 underline-offset-4"
        >
          {org.coordinationEmail}
        </a>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <ExternalLink href={externalLinks.coordinationAppointments}>
            {copy.appointmentCta}
          </ExternalLink>
          <ExternalLink href={externalLinks.absenceForm}>
            {copy.absenceCta}
          </ExternalLink>
        </div>
      </PageSection>
    </PageFrame>
  );
};

export default RecursosPage;
