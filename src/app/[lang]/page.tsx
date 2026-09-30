import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeMotion } from "@/components/home-motion";
import { LabVisual } from "@/components/lab-visual";
import { LearningStory } from "@/components/learning-story";
import {
  PageFrame,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { externalLinks } from "@/content/site-content";
import type { Dictionary } from "@/lib/dictionary";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, LocaleParams } from "@/lib/i18n";
import { hasLocale, localizedPath } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";

export const revalidate = 3600;

interface HomeCopy {
  dict: Dictionary;
  locale: Locale;
}

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/", getDictionary(lang));
};

const HeroSection = ({ dict, locale }: HomeCopy) => {
  const copy = dict.pages.home.hero;
  return (
    <section id="inicio" className="bg-tinto text-white">
      <div className="hero-layout mx-auto grid max-w-300 items-center gap-8 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-6 lg:py-14">
        <div className="min-w-0">
          <h1 className="hero-title">{copy.title}</h1>
          <p className="mt-5 text-xl font-medium text-[#e2c58f] sm:text-2xl">
            {copy.lede}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
            {copy.text}
          </p>
          <div className="mt-6 grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
            <Link
              href={localizedPath(locale, "/carrera")}
              className="hero-action"
            >
              {copy.careerCta} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={localizedPath(locale, "/alumnos")}
              className="hero-action"
            >
              {copy.studentCta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <LabVisual dict={dict} locale={locale} />
      </div>
    </section>
  );
};

const CareerSection = ({ dict, locale }: HomeCopy) => {
  const copy = dict.pages.home;
  return (
    <PageSection id="carrera">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-grafito max-w-lg font-serif text-4xl leading-tight sm:text-5xl">
          {copy.career.title}
        </h2>
        <div>
          <p className="text-piedra max-w-2xl text-xl leading-relaxed">
            {copy.career.text}
          </p>
        </div>
      </div>
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {copy.capabilities.map((capability) => (
          <article
            key={capability.title}
            className="rounded-card bg-marfil shadow-soft/50 p-6"
          >
            <h3 className="text-grafito font-serif text-2xl">
              {capability.title}
            </h3>
            <p className="text-piedra mt-3">{capability.text}</p>
          </article>
        ))}
      </div>
      <p className="text-piedra mt-10 max-w-2xl">
        {copy.career.deepen}{" "}
        {dict.specialties
          .map((specialty) => specialty.title)
          .join(copy.career.join)}
        .
      </p>
      <div className="mt-8">
        <Link
          href={localizedPath(locale, "/carrera")}
          className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
        >
          {copy.career.cta} ↗
        </Link>
      </div>
    </PageSection>
  );
};

const ProjectsSection = ({ dict, locale }: HomeCopy) => (
  <PageSection tone="marfil" id="proyectos">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <h2 className="text-grafito font-serif text-4xl sm:text-5xl">
        {dict.pages.home.projects.title}
      </h2>
      <Link
        href={localizedPath(locale, "/proyectos")}
        className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
      >
        {dict.pages.home.projects.cta} ↗
      </Link>
    </div>
    <div className="mt-9 grid gap-4 md:grid-cols-2">
      {dict.projects.map((project) => (
        <article
          key={project.title}
          className="rounded-card shadow-soft/50 bg-white p-6"
        >
          <h3 className="text-grafito font-serif text-2xl">{project.title}</h3>
          <p className="text-piedra mt-3">{project.process}</p>
        </article>
      ))}
    </div>
  </PageSection>
);

const StudyPlanSection = ({ dict }: HomeCopy) => (
  <section id="plan" className="bg-tinto py-12 text-white sm:py-16">
    <div className="mx-auto grid max-w-300 items-center gap-8 px-5 lg:grid-cols-[1fr_auto] lg:px-6">
      <div>
        <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          {dict.pages.home.plan.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">
          {dict.pages.home.plan.text}
        </p>
      </div>
      <a
        href={externalLinks.tuRutaIdeal}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full px-5 py-3 font-bold text-white transition hover:bg-white/10"
      >
        {dict.pages.home.plan.cta} ↗
      </a>
    </div>
  </section>
);

const CommunitySection = ({ dict, locale }: HomeCopy) => {
  const copy = dict.pages.home;
  return (
    <>
      <PageSection tone="marfil" id="comunidad">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-grafito font-serif text-4xl sm:text-5xl">
              {copy.community.title}
            </h2>
            <p className="text-piedra mt-4 max-w-xl text-lg">
              {copy.community.text}
            </p>
            <Link
              href={localizedPath(locale, "/comunidad")}
              className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
            >
              {copy.community.cta} ↗
            </Link>
          </div>
          <Link
            href={localizedPath(locale, "/oportunidades")}
            className="rounded-card bg-tinto hover:shadow-soft flex items-end p-7 text-white transition sm:p-9"
          >
            <span className="font-serif text-3xl leading-tight">
              {copy.community.internships}
            </span>
          </Link>
        </div>
      </PageSection>
      <PageSection id="vida">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="text-grafito font-serif text-4xl leading-tight sm:text-5xl">
              {copy.campus.title}
            </h2>
            <p className="text-piedra mt-4 max-w-lg text-lg">
              {copy.campus.text}
            </p>
            <Link
              href={localizedPath(locale, "/comunidad")}
              className="text-tinto decoration-dorado mt-6 inline-flex font-semibold underline decoration-2 underline-offset-4"
            >
              {copy.campus.cta} ↗
            </Link>
          </div>
          <div>
            <div className="grid gap-3 sm:grid-cols-3">
              {copy.campus.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-card bg-marfil shadow-soft/50 p-5"
                >
                  <h3 className="text-grafito font-serif text-2xl leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-piedra mt-3">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </PageSection>
    </>
  );
};

const NextStepSection = ({ dict, locale }: HomeCopy) => {
  const copy = dict.pages.home;
  return (
    <>
      <PageSection tone="marfil" id="siguiente-paso">
        <SectionHeading title={copy.next.title} />
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href={localizedPath(locale, "/aspirantes")}
            className="group rounded-card text-grafito hover:shadow-soft bg-white p-7 transition sm:p-9"
          >
            <h3 className="font-serif text-3xl">{copy.next.admissionsTitle}</h3>
            <p className="text-piedra mt-3 max-w-md">
              {copy.next.admissionsText}
            </p>
            <span className="text-tinto mt-7 inline-flex font-bold">
              {copy.next.admissionsCta}{" "}
              <span className="ml-2 transition group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </Link>
          <Link
            href={localizedPath(locale, "/alumnos")}
            className="group rounded-card text-grafito hover:shadow-soft bg-white p-7 transition sm:p-9"
          >
            <h3 className="font-serif text-3xl">{copy.next.studentsTitle}</h3>
            <p className="text-piedra mt-3 max-w-md">
              {copy.next.studentsText}
            </p>
            <span className="text-tinto mt-7 inline-flex font-bold">
              {copy.next.studentsCta}{" "}
              <span className="ml-2 transition group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        </div>
      </PageSection>
      <PageSection id="faq">
        <SectionHeading title={copy.faq.title} />
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href={`${localizedPath(locale, "/aspirantes")}#faq`}
            className="rounded-card hover:shadow-soft bg-white p-7 transition"
          >
            <h3 className="text-grafito font-serif text-2xl">
              {copy.faq.applicantsTitle}
            </h3>
            <p className="text-piedra mt-3">{copy.faq.applicantsText}</p>
          </Link>
          <Link
            href={`${localizedPath(locale, "/alumnos")}#faq`}
            className="rounded-card hover:shadow-soft bg-white p-7 transition"
          >
            <h3 className="text-grafito font-serif text-2xl">
              {copy.faq.studentsTitle}
            </h3>
            <p className="text-piedra mt-3">{copy.faq.studentsText}</p>
          </Link>
        </div>
      </PageSection>
    </>
  );
};

const Home = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const home = { dict, locale: lang };

  return (
    <PageFrame dict={dict} locale={lang}>
      <HomeMotion />
      <HeroSection {...home} />
      <LearningStory dict={dict} locale={lang} />
      <CareerSection {...home} />
      <ProjectsSection {...home} />
      <StudyPlanSection {...home} />
      <CommunitySection {...home} />
      <NextStepSection {...home} />
    </PageFrame>
  );
};

export default Home;
