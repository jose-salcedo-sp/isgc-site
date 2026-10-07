import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GpaCalculator } from "@/components/gpa-calculator";
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
  const areaList = [
    { id: "software", ...areas.software },
    { id: "ai", ...areas.ai },
    { id: "vr", ...areas.vr },
    { id: "graphics", ...areas.graphics },
    { id: "data", ...areas.data },
  ];
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
        aside={
          <dl
            className="grid shrink-0 grid-cols-2 gap-x-10 border-t border-white/20 pt-6 lg:w-96"
            data-intro="2"
          >
            <div className="flex flex-col-reverse">
              <dt className="text-white/75">{copy.legendSemester}</dt>
              <dd
                className="text-7xl leading-none font-bold tracking-[-0.05em] text-[#e2c58f] tabular-nums sm:text-8xl"
                data-count
              >
                {curriculum.program.semesters}
              </dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-white/75">{copy.legendCourse}</dt>
              <dd
                className="text-7xl leading-none font-bold tracking-[-0.05em] text-[#e2c58f] tabular-nums sm:text-8xl"
                data-count
              >
                {curriculum.courses.length}
              </dd>
            </div>
          </dl>
        }
        crumb={{ name: copy.crumb, path: "/carrera" }}
        description={copy.description}
        dict={dict}
        locale={lang}
        title={copy.title}
        tone="grafito"
      />
      <PageSection id="semestres">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-grafito text-4xl leading-tight sm:text-5xl">
              {copy.planTitle}
            </h2>
            <p className="text-piedra mt-4 text-lg">
              {fill(copy.planMeta, {
                campus: org.campus,
                plan: org.plan,
                rvoe: org.rvoe,
              })}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
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
          </div>
          <ul className="border-grafito/15 grid border-t">
            {areaList.map((item) => (
              <li
                key={item.id}
                className="border-grafito/15 border-b py-6 sm:py-8"
              >
                <h3 className="text-grafito text-2xl sm:text-3xl">
                  {item.name}
                </h3>
                <p className="text-piedra mt-2 max-w-xl">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageSection>
      <div className="bg-marfil py-16 sm:py-20">
        <div className="mx-auto max-w-300 px-5 lg:px-6">
          {/* A rail of semesters: a swipeable strip on phones, a 5 × 2 board
              on desktop. The rule above each column draws itself in order as
              the rail scrolls in, so it reads as a timeline. */}
          <ol className="-mx-5 flex snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-y-14 lg:overflow-visible lg:px-0 lg:pb-0">
            {planSemesters.map((item, index) => (
              <li
                key={item.semester}
                className="relative w-[72%] shrink-0 snap-start pt-5 pr-6 sm:w-[40%] lg:w-auto"
              >
                <span
                  className="bg-grafito/20 absolute top-0 left-0 h-px w-full"
                  aria-hidden="true"
                  data-reveal="line"
                  data-delay={(index % 5) * 0.12}
                />
                <span
                  className="bg-tinto absolute -top-[5px] left-0 size-[9px] rounded-full"
                  aria-hidden="true"
                />
                <h3 className="text-tinto text-5xl leading-none font-bold tracking-[-0.05em] tabular-nums">
                  <span className="sr-only">
                    {fill(copy.semester, { n: item.semester })}
                  </span>
                  <span aria-hidden="true">
                    {String(item.semester).padStart(2, "0")}
                  </span>
                </h3>
                <ul className="text-grafito mt-5 space-y-2 text-[15px] leading-snug">
                  {item.courses.map((course) => (
                    <li key={course.id}>
                      {localizedCourseName(dict, course.id, course.name)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <PageSection id="gpa">
        <SectionHeading
          title={copy.gpa.title}
          description={copy.gpa.description}
        />
        <GpaCalculator
          courses={curriculum.courses.flatMap((course) =>
            course.credits === null
              ? []
              : [
                  {
                    credits: course.credits,
                    id: course.id,
                    name: localizedCourseName(dict, course.id, course.name),
                    semester: course.semester,
                  },
                ]
          )}
          semesterLabels={copy.semesterLabels}
          text={copy.gpa}
        />
      </PageSection>
      <section className="graph-surface w-full py-16 sm:py-24" id="mapa">
        <div className="mx-auto max-w-300 px-5 lg:px-6">
          <h2 className="text-foreground max-w-4xl text-5xl leading-[1.02] tracking-[-0.04em] sm:text-7xl">
            {copy.mapTitleBefore}
            <em className="text-[#e2c58f] not-italic">
              {copy.mapTitleEmphasis}
            </em>
            .
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            {copy.mapText}
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
      <PageSection id="aprendizaje">
        <SectionHeading title={copy.learnTitle} />
        <ol className="border-grafito/15 grid border-t">
          {copy.learn.map((item) => (
            <li
              key={item.title}
              className="border-grafito/15 grid gap-3 border-b py-8 md:grid-cols-2 md:items-end md:gap-10 md:py-10"
            >
              <h3 className="text-grafito text-5xl leading-none tracking-[-0.045em] sm:text-7xl">
                {item.title}
              </h3>
              <p className="text-piedra max-w-md text-lg">{item.text}</p>
            </li>
          ))}
        </ol>
      </PageSection>
      <PageSection tone="marfil" id="especializacion">
        <SectionHeading
          title={copy.trackTitle}
          description={copy.trackDescription}
        />
        <ul className="border-grafito/15 grid border-t md:grid-cols-2 md:gap-x-16">
          {copy.specialtyList.map((specialty) => (
            <li
              key={specialty}
              className="border-grafito/15 text-grafito border-b py-5 text-2xl leading-tight font-medium sm:text-3xl"
            >
              {specialty}
            </li>
          ))}
        </ul>
      </PageSection>
      <section id="doble-carrera" className="bg-tinto text-white">
        <div className="mx-auto max-w-300 px-5 py-16 sm:py-20 lg:px-6">
          <h2 className="text-4xl sm:text-5xl">{copy.doubleTitle}</h2>
          <p className="mt-5 max-w-md text-lg text-white/80">
            {copy.doubleText}
          </p>
        </div>
      </section>
    </PageFrame>
  );
};

export default CarreraPage;
