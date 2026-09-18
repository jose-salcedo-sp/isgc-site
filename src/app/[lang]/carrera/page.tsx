import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GraphView } from "@/components/graph/graph-view";
import {
  ExternalLink,
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { JsonLd } from "@/components/seo/json-ld";
import { externalLinks } from "@/content/site-content";
import curriculum from "@/data/curriculum.json";
import { localizedCourseName, localizedGraphNodes } from "@/lib/course-copy";
import { curriculumGraph } from "@/lib/curriculum-graph";
import { getDictionary } from "@/lib/dictionary";
import { fill, hasLocale } from "@/lib/i18n";
import type { LocaleParams } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { org, universityUrl } from "@/lib/site";

export const generateMetadata = async ({
  params,
}: LocaleParams): Promise<Metadata> => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  return pageMetadata(lang, "/carrera", getDictionary(lang));
};

const planSemesters = Array.from(
  { length: curriculum.program.semesters },
  (_, index) => {
    const semester = index + 1;

    return {
      courses: curriculum.courses.filter(
        (course) => course.semester === semester
      ),
      semester,
    };
  }
);

const CarreraPage = async ({ params }: LocaleParams) => {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = getDictionary(lang);
  const copy = dict.pages.carrera;
  const { areas } = copy;
  const graphNodes = localizedGraphNodes(
    curriculumGraph.nodes,
    dict,
    copy.semesterLabels
  );

  return (
    <PageFrame dict={dict} locale={lang}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          description: copy.description,
          educationalCredentialAwarded: org.name,
          identifier: org.rvoe,
          name: org.name,
          provider: {
            "@type": "CollegeOrUniversity",
            name: org.campus,
            url: universityUrl,
          },
        }}
      />
      <PageIntro
        chapters={dict.chapters.carrera}
        crumb={{ name: copy.crumb, path: "/carrera" }}
        description={copy.description}
        dict={dict}
        lede={copy.lede}
        locale={lang}
        title={copy.title}
      />
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <h2 className="text-grafito font-serif text-4xl leading-tight sm:text-5xl">
            {copy.wideTitle}
          </h2>
          <div>
            <p className="text-piedra text-xl leading-relaxed">
              {copy.wideText}
            </p>
          </div>
        </div>
      </PageSection>
      <PageSection tone="marfil">
        <SectionHeading
          title={copy.learnTitle}
          description={copy.learnDescription}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {copy.learn.map((item) => (
            <article
              key={item.title}
              className="rounded-card shadow-soft/50 bg-white p-6"
            >
              <h3 className="text-grafito font-serif text-2xl">{item.title}</h3>
              <p className="text-piedra mt-3">{item.text}</p>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection id="semestres">
        <SectionHeading
          title={copy.planTitle}
          description={fill(copy.planMeta, {
            campus: org.campus,
            courses: curriculum.courses.length,
            plan: org.plan,
            rvoe: org.rvoe,
          })}
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {(
            [
              { id: "software", ...areas.software },
              { id: "ai", ...areas.ai },
              { id: "vr", ...areas.vr },
              { id: "graphics", ...areas.graphics },
              { id: "data", ...areas.data },
            ] as const
          ).map((item) => (
            <li key={item.id} className="rounded-card bg-marfil p-6">
              <h3 className="text-grafito font-serif text-2xl">{item.name}</h3>
              <p className="text-piedra mt-3">{item.description}</p>
            </li>
          ))}
        </ul>
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {planSemesters.map((item) => (
            <li key={item.semester} className="rounded-card bg-marfil p-6">
              <h3 className="text-grafito font-serif text-2xl">
                {fill(copy.semester, { n: item.semester })}
              </h3>
              <ul className="text-piedra mt-4 list-disc space-y-1 pl-5">
                {item.courses.map((course) => (
                  <li key={course.id}>
                    {localizedCourseName(dict, course.id, course.name)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-5">
          <ExternalLink href={externalLinks.tuRutaIdeal}>
            {copy.rutaCta}
          </ExternalLink>
          <a
            href={`mailto:${org.coordinationEmail}?subject=${encodeURIComponent(copy.planSubject)}`}
            className="text-tinto decoration-dorado font-semibold underline decoration-2 underline-offset-4"
          >
            {copy.planCta} ↗
          </a>
        </div>
      </PageSection>
      <section className="graph-surface w-full py-16 sm:py-20" id="mapa">
        <div className="mx-auto max-w-300 px-5 lg:px-6">
          <p className="text-dorado text-xs font-bold tracking-[0.18em] uppercase">
            {copy.mapEyebrow}
          </p>
          <h2 className="text-foreground mt-4 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-6xl">
            {copy.mapTitleBefore}
            <em className="text-dorado not-italic">{copy.mapTitleEmphasis}</em>.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-relaxed">
            {fill(copy.mapText, { campus: org.campus, rvoe: org.rvoe })}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: copy.legendSemester, tone: "bg-graph-semester" },
              { label: copy.legendCourse, tone: "bg-graph-course" },
            ].map((item) => (
              <li
                className="text-muted-foreground flex items-center gap-2 text-sm font-semibold"
                key={item.label}
              >
                <span className={`size-2.5 rounded-full ${item.tone}`} />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mt-10 w-full">
          <GraphView
            initialEdges={curriculumGraph.edges}
            initialNodes={graphNodes}
            text={dict.graph}
          />
        </div>
      </section>
      <PageSection tone="marfil" id="especializacion">
        <SectionHeading
          title={copy.trackTitle}
          description={copy.trackDescription}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {dict.specialties.map((specialty) => (
            <article
              key={specialty.title}
              className="rounded-card shadow-soft/50 bg-white p-7"
            >
              <h3 className="text-grafito font-serif text-3xl">
                {specialty.title}
              </h3>
              <p className="text-piedra mt-4 text-lg">{specialty.text}</p>
              <ul className="text-grafito mt-6 space-y-2 font-semibold">
                {specialty.subjects.map((subject) => (
                  <li key={subject}>· {subject}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection>
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-card bg-tinto p-7 text-white sm:p-9">
            <h2 className="font-serif text-3xl">{copy.doubleTitle}</h2>
            <p className="mt-4 text-white/80">{copy.doubleText}</p>
          </article>
          <article className="rounded-card bg-marfil p-7 sm:p-9">
            <h2 className="text-grafito font-serif text-3xl">
              {copy.fieldTitle}
            </h2>
            <p className="text-piedra mt-4">{copy.fieldText}</p>
          </article>
        </div>
      </PageSection>
    </PageFrame>
  );
};

export default CarreraPage;
