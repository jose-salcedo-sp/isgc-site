import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
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
  return pageMetadata(lang, "/oportunidades", getDictionary(lang));
};

const OportunidadesPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.oportunidades;

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        chapters={dict.chapters.oportunidades}
        crumb={{ name: copy.crumb, path: "/oportunidades" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection>
        <SectionHeading title={copy.profileTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {copy.steps.map((step) => (
            <article key={step.title} className="rounded-card bg-marfil p-7">
              <h3 className="text-grafito font-serif text-2xl">{step.title}</h3>
              <p className="text-piedra mt-3">{step.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-5">
          <ExternalLink href="https://mx.linkedin.com/">
            {copy.linkedin}
          </ExternalLink>
          <ExternalLink href="https://github.com/">{copy.github}</ExternalLink>
        </div>
      </PageSection>
      <PageSection tone="marfil">
        <SectionHeading title={copy.portalsTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {copy.portals.map((portal) => (
            <article
              key={portal.title}
              className="rounded-card shadow-soft/50 bg-white p-6"
            >
              <h3 className="text-grafito font-serif text-2xl">
                {portal.title}
              </h3>
              <p className="text-piedra mt-3">{portal.text}</p>
              <div className="mt-5">
                <ExternalLink href={portal.href}>
                  {copy.visitPortal}
                </ExternalLink>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection>
        <div className="rounded-card bg-tinto p-8 text-white sm:p-10">
          <h2 className="font-serif text-4xl">{copy.helpTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            {copy.helpText}
          </p>
          <a
            href={`mailto:${org.coordinationEmail}`}
            className="text-dorado mt-6 inline-flex font-bold underline underline-offset-4"
          >
            {org.coordinationEmail} ↗
          </a>
        </div>
      </PageSection>
    </PageFrame>
  );
};

export default OportunidadesPage;
