import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CarreraCurriculumMap } from "@/app/[lang]/carrera/carrera-curriculum-map";
import { CarreraPlanOverview } from "@/app/[lang]/carrera/carrera-plan-overview";
import { CarreraSemesterBoard } from "@/app/[lang]/carrera/carrera-semester-board";
import { GpaCalculator } from "@/components/gpa-calculator";
import { FaqAccordion } from "@/components/home-interactions";
import {
  PageFrame,
  PageIntro,
  PageSection,
  SectionHeading,
} from "@/components/page-frame";
import { JsonLd } from "@/components/seo/json-ld";
import curriculum from "@/data/curriculum.json";
import { localizedCourseName, localizedGraphNodes } from "@/lib/course-copy";
import { curriculumGraph } from "@/lib/curriculum-graph";
import { getDictionary } from "@/lib/dictionary";
import { hasLocale } from "@/lib/i18n";
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
      <PageSection id="sobre-la-carrera">
        <SectionHeading
          title={copy.videoTitle}
          description={copy.videoDescription}
        />
        <div className="bg-marfil text-piedra flex aspect-video w-full items-center justify-center text-lg font-semibold">
          {copy.videoPlaceholder}
        </div>
      </PageSection>
      <CarreraPlanOverview areaList={areaList} copy={copy} />
      <CarreraSemesterBoard copy={copy} dict={dict} />
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
      <CarreraCurriculumMap
        copy={copy}
        dict={dict}
        edges={curriculumGraph.edges}
        nodes={graphNodes}
      />
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
              key={specialty.name}
              className="border-grafito/15 border-b py-8"
            >
              <h3 className="text-grafito text-2xl leading-tight font-medium sm:text-3xl">
                {specialty.name}
              </h3>
              <p className="text-piedra mt-3 max-w-md text-lg">
                {specialty.description}
              </p>
              {specialty.testimony ? (
                <figure className="border-dorado mt-5 border-l-2 pl-4">
                  <blockquote className="text-grafito">
                    “{specialty.testimony}”
                  </blockquote>
                  {specialty.student ? (
                    <figcaption className="text-piedra mt-2 text-sm font-semibold">
                      {specialty.student}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </li>
          ))}
        </ul>
      </PageSection>
      <PageSection id="ingreso">
        <SectionHeading title={copy.admissionTitle} />
        <FaqAccordion
          groups={[{ items: copy.admissionFaqs, title: copy.admissionTitle }]}
        />
      </PageSection>
      <PageSection id="campo-profesional">
        <SectionHeading title={copy.fieldTitle} />
        <p className="text-piedra max-w-2xl text-lg">{copy.fieldText}</p>
      </PageSection>
      <section id="doble-carrera" className="bg-tinto text-white">
        <div className="mx-auto max-w-300 px-5 py-16 sm:py-20 lg:px-6">
          <h2 className="text-4xl sm:text-5xl">{copy.doubleTitle}</h2>
          <p className="mt-5 max-w-md text-lg text-white/80">
            {copy.doubleText}
          </p>
          <dl className="mt-10 grid gap-8 md:grid-cols-3">
            {copy.doubleItems.map((item) => (
              <div key={item.title} className="border-t border-white/25 pt-5">
                <dt className="text-xl font-bold">{item.title}</dt>
                <dd className="mt-2 text-white/80">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageFrame>
  );
};

export default CarreraPage;
