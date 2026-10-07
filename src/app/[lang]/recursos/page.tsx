import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  FaqAccordion,
  StudentResourceSearch,
} from "@/components/home-interactions";
import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { FaqJsonLd } from "@/components/seo/faq-json-ld";
import {
  externalLinks,
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
  return pageMetadata(lang, "/recursos", getDictionary(lang));
};

const RecursosPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.alumnos;
  const quickLabels = Object.fromEntries(
    dict.quickAccess.map((item) => [item.id, item.label])
  );

  return (
    <PageFrame dict={dict} locale={lang}>
      <FaqJsonLd items={dict.faqs.alumnos} />
      <PageIntro
        aside={
          <div
            id="accesos"
            className="w-full shrink-0 lg:w-[26rem]"
            data-intro="2"
          >
            <h2 className="text-2xl">{copy.quickTitle}</h2>
            <ul className="mt-5 border-t border-white/25">
              {quickAccess.map((item) => (
                <li key={item.id} className="border-b border-white/25">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-between gap-4 py-4 text-xl font-bold hover:text-[#e2c58f] sm:text-2xl"
                  >
                    {quickLabels[item.id]}
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
          resources={studentResources}
        />
      </PageSection>
      <PageSection tone="marfil" id="coordinacion">
        <div className="divide-grafito/15 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x">
          <div className="md:pr-12">
            <h2 className="text-grafito text-4xl sm:text-5xl">
              {copy.coordTitle}
            </h2>
            <p className="text-piedra mt-4 max-w-md text-lg">
              {copy.coordText}
            </p>
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
          </div>
          <div className="md:pl-12">
            <h2 className="text-grafito text-4xl sm:text-5xl">
              {copy.regsTitle}
            </h2>
            <p className="text-piedra mt-4 max-w-md text-lg">{copy.regsText}</p>
            <a
              href={externalLinks.schoolServices}
              target="_blank"
              rel="noreferrer"
              className="text-tinto decoration-dorado mt-6 text-xl font-bold underline decoration-2 underline-offset-4"
            >
              {copy.regsCta} <span aria-hidden="true">↗</span>
            </a>
          </div>
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

export default RecursosPage;
