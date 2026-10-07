import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
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
        crumb={{ name: copy.crumb, path: "/oportunidades" }}
        description={copy.description}
        dict={dict}
        display
        locale={lang}
        title={copy.title}
        tone="grafito"
      >
        <div className="mt-16 sm:mt-24">
          <h2 className="text-3xl sm:text-4xl">{copy.portalsTitle}</h2>
          <ul className="mt-8 grid border-t border-white/20 md:grid-cols-3 md:divide-x md:divide-white/20">
            {copy.portals.map((portal) => (
              <li
                key={portal.title}
                className="border-b border-white/20 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"
              >
                <a
                  href={portal.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block py-8"
                >
                  <span className="block text-3xl leading-tight font-bold tracking-[-0.025em] group-hover:text-[#e2c58f] sm:text-4xl">
                    {portal.title}
                  </span>
                  <span className="mt-3 block text-lg text-white/75">
                    {portal.text}
                  </span>
                  <span className="mt-6 inline-block font-semibold text-[#e2c58f]">
                    {copy.visitPortal} ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </PageIntro>
      <PageSection tone="marfil">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-grafito text-4xl leading-tight sm:text-5xl">
              {copy.profileTitle}
            </h2>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <ExternalLink href="https://mx.linkedin.com/">
                {copy.linkedin}
              </ExternalLink>
              <ExternalLink href="https://github.com/">
                {copy.github}
              </ExternalLink>
            </div>
          </div>
          <ol className="border-grafito/15 grid border-t" data-follow>
            {copy.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-grafito/15 grid grid-cols-[3.5rem_1fr] gap-4 border-b py-8 sm:grid-cols-[6rem_1fr]"
              >
                <span
                  className="text-tinto text-5xl leading-none font-bold tracking-[-0.05em] tabular-nums sm:text-6xl"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-grafito text-2xl sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-piedra mt-2 text-lg">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </PageSection>
      <section className="bg-tinto py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-300 gap-8 px-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16 lg:px-6">
          <h2 className="text-5xl leading-[1.02] tracking-[-0.045em] sm:text-7xl">
            {copy.helpTitle}
          </h2>
          <div>
            <p className="text-lg text-white/80">{copy.helpText}</p>
            <a
              href={`mailto:${org.coordinationEmail}`}
              className="mt-5 text-2xl font-bold break-all text-[#e2c58f] sm:text-3xl"
            >
              <span className="underline decoration-2 underline-offset-8">
                {org.coordinationEmail}
              </span>{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </PageFrame>
  );
};

export default OportunidadesPage;
