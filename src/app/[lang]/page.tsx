import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HomeMotion } from "@/components/home-motion";
import { LearningStory } from "@/components/learning-story";
import {
  PageFrame,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { RenderHeroCanvas } from "@/components/render-hero";
import { ScrollHint } from "@/components/scroll-hint";
import { faculty } from "@/content/site-content";
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
    <section id="inicio" className="render-hero bg-tinto text-white">
      <div className="render-hero-sticky">
        <RenderHeroCanvas label={copy.canvasAria} />
        <div className="render-hero-content mx-auto w-full max-w-300 px-5 lg:px-6">
          <h1 className="hero-title" data-intro="0">
            {copy.title}
          </h1>
          <p
            className="mt-5 text-xl font-medium text-[#e2c58f] sm:text-2xl"
            data-intro="1"
          >
            {copy.lede}
          </p>
          <p
            className="mt-3 max-w-md text-base leading-relaxed text-white/80 sm:text-lg"
            data-intro="2"
          >
            {copy.text}
          </p>
          <div
            className="mt-7 grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap"
            data-intro="3"
          >
            <Link
              href={localizedPath(locale, "/carrera")}
              className="hero-action"
              data-magnetic
            >
              {copy.careerCta} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={localizedPath(locale, "/recursos")}
              className="hero-action"
              data-magnetic
            >
              {copy.studentCta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const CareerSection = ({ dict, locale }: HomeCopy) => {
  const copy = dict.pages.home;
  return (
    <PageSection id="carrera">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <h2 className="text-grafito text-5xl leading-[1.02] tracking-[-0.045em] sm:text-7xl">
          {copy.career.title}
        </h2>
        <p className="text-piedra max-w-md text-xl leading-relaxed">
          {copy.career.text}
        </p>
      </div>
      <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        {copy.capabilities.map((capability) => (
          <article
            key={capability.title}
            className="border-grafito border-t-2 pt-6"
          >
            <h3 className="text-grafito text-2xl sm:text-3xl">
              {capability.title}
            </h3>
            <p className="text-piedra mt-3 text-lg">{capability.text}</p>
          </article>
        ))}
      </div>
      <div className="border-grafito/15 mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="text-grafito text-lg">
          {copy.career.deepen}{" "}
          {dict.specialties
            .map((specialty) => specialty.title)
            .join(copy.career.join)}
          .
        </p>
        <Link
          href={localizedPath(locale, "/carrera")}
          className="text-tinto decoration-dorado shrink-0 font-semibold underline decoration-2 underline-offset-4"
        >
          {copy.career.cta} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </PageSection>
  );
};

const NextStepSection = ({ dict, locale }: HomeCopy) => {
  const copy = dict.pages.home;
  return (
    <PageSection id="siguiente-paso">
      <SectionHeading title={copy.next.title} />
      <div className="divide-grafito/15 border-grafito/15 grid divide-y border-y md:grid-cols-2 md:divide-x md:divide-y-0">
        <Link
          href={localizedPath(locale, "/aspirantes")}
          className="group block py-10 md:py-14 md:pr-12"
        >
          <h3 className="text-grafito group-hover:text-tinto text-4xl leading-tight transition-colors sm:text-5xl">
            {copy.next.admissionsTitle}
          </h3>
          <p className="text-piedra mt-4 max-w-md text-lg">
            {copy.next.admissionsText}
          </p>
          <p className="text-tinto mt-8 font-bold">
            {copy.next.admissionsCta}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </p>
        </Link>
        <Link
          href={localizedPath(locale, "/recursos")}
          className="group block py-10 md:py-14 md:pl-12"
        >
          <h3 className="text-grafito group-hover:text-tinto text-4xl leading-tight transition-colors sm:text-5xl">
            {copy.next.studentsTitle}
          </h3>
          <p className="text-piedra mt-4 max-w-md text-lg">
            {copy.next.studentsText}
          </p>
          <p className="text-tinto mt-8 font-bold">
            {copy.next.studentsCta}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </p>
        </Link>
      </div>
    </PageSection>
  );
};

const ProjectsSection = ({ dict, locale }: HomeCopy) => (
  <PageSection tone="marfil" id="proyectos">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <h2 className="text-grafito max-w-2xl text-4xl leading-tight sm:text-5xl">
        {dict.pages.home.projects.title}
      </h2>
      <Link
        href={localizedPath(locale, "/proyectos")}
        className="text-tinto decoration-dorado shrink-0 font-semibold underline decoration-2 underline-offset-4"
      >
        {dict.pages.home.projects.cta} <span aria-hidden="true">→</span>
      </Link>
    </div>
    <ol className="border-grafito/15 mt-12 grid border-t">
      {dict.projects.map((project, index) => (
        <li
          key={project.title}
          className="border-grafito/15 grid gap-3 border-b py-8 md:grid-cols-[4rem_minmax(0,6fr)_minmax(0,5fr)] md:gap-8 md:py-10"
        >
          <span
            className="text-tinto text-lg font-bold tabular-nums"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-grafito text-3xl leading-tight sm:text-4xl">
            {project.title}
          </h3>
          <p className="text-piedra text-lg md:pt-1">{project.process}</p>
        </li>
      ))}
    </ol>
  </PageSection>
);

const CommunitySection = ({ dict }: HomeCopy) => {
  const copy = dict.pages.home.community;
  return (
    <PageSection id="comunidad">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
        <h2 className="text-grafito text-4xl leading-tight sm:text-5xl">
          {copy.title}
        </h2>
        <p className="text-piedra max-w-md text-lg">{copy.text}</p>
      </div>
      <ul className="border-grafito/15 mt-12 grid border-t">
        {faculty.map((person) => {
          const item = dict.faculty[person.id];
          return (
            <li
              key={person.id}
              className="border-grafito/15 grid gap-3 border-b py-8 md:grid-cols-[minmax(0,6fr)_minmax(0,4fr)_minmax(0,3fr)] md:items-center md:gap-10"
            >
              <div className="flex items-center gap-5">
                <span
                  className="bg-marfil text-tinto flex size-16 shrink-0 items-center justify-center rounded-full text-xl font-bold"
                  aria-hidden="true"
                >
                  {person.name
                    .split(" ")
                    .slice(0, 2)
                    .map((part) => part[0])
                    .join("")}
                </span>
                <h3 className="text-grafito text-3xl leading-tight font-bold tracking-[-0.025em] text-balance sm:text-4xl">
                  {person.name}
                </h3>
              </div>
              <p className="text-grafito text-lg font-semibold">{item.role}</p>
              <a
                href={`mailto:${person.email}`}
                className="text-tinto decoration-dorado justify-self-start font-semibold underline decoration-2 underline-offset-4"
              >
                {person.email}
              </a>
            </li>
          );
        })}
      </ul>
    </PageSection>
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
      <ScrollHint label={dict.pages.home.scrollHint} />
      <HeroSection {...home} />
      <LearningStory dict={dict} locale={lang} />
      <CareerSection {...home} />
      <NextStepSection {...home} />
      <ProjectsSection {...home} />
      <CommunitySection {...home} />
    </PageFrame>
  );
};

export default Home;
