import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageFrame, PageIntro, PageSection } from "@/components/page-frame";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/hall-of-fame", getDictionary(lang));
};

const HallOfFamePage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.hallOfFame;

  return (
    <PageFrame dict={dict} locale={lang}>
      <PageIntro
        chapters={dict.chapters.hallOfFame}
        crumb={{ name: copy.crumb, path: "/hall-of-fame" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      {dict.alumni.map((alumnus, index) => {
        const isMarfil = index % 2 === 1;
        return (
          <PageSection key={alumnus.name} tone={isMarfil ? "marfil" : "white"}>
            <article
              className={`rounded-card shadow-soft/50 grid gap-7 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center ${isMarfil ? "bg-white" : "bg-marfil"}`}
            >
              <div>
                <div
                  aria-hidden="true"
                  className={`rounded-card aspect-[4/3] ${isMarfil ? "bg-marfil" : "bg-white"}`}
                />
                <p className="sr-only">{alumnus.imageAlt}</p>
              </div>
              <div>
                <h2 className="text-grafito font-serif text-3xl sm:text-4xl">
                  {alumnus.name}
                </h2>
                <p className="text-tinto mt-3 font-semibold">{alumnus.role}</p>
                <p className="text-piedra mt-6 max-w-2xl text-lg leading-relaxed">
                  “{alumnus.testimony}”
                </p>
              </div>
            </article>
          </PageSection>
        );
      })}
    </PageFrame>
  );
};

export default HallOfFamePage;
