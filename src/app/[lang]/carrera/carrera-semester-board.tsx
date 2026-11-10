import { SeriesBoard } from "@/components/series-board";
import curriculum from "@/data/curriculum.json";
import { localizedCourseName } from "@/lib/course-copy";
import type { Dictionary } from "@/lib/dictionary";
import { fill } from "@/lib/i18n";

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

const prerequisiteEdges = curriculum.graph.edges.filter(
  (edge) => edge.label === "relates"
);

const followChain = (start: string, forward: boolean, found: Set<string>) => {
  const pending = [start];
  while (pending.length > 0) {
    const current = pending.pop();
    for (const edge of prerequisiteEdges) {
      const from = forward ? edge.a : edge.b;
      const to = forward ? edge.b : edge.a;
      if (from === current && !found.has(to)) {
        found.add(to);
        pending.push(to);
      }
    }
  }
};

const seriesOf = (courseId: string): string | undefined => {
  const chain = new Set<string>();
  followChain(courseId, true, chain);
  followChain(courseId, false, chain);
  if (chain.size === 0) {
    return undefined;
  }
  chain.add(courseId);
  return [...chain].join(" ");
};

export const CarreraSemesterBoard = ({
  copy,
  dict,
}: {
  copy: { semester: string };
  dict: Dictionary;
}) => (
  <div className="bg-marfil py-16 sm:py-20">
    <div className="mx-auto max-w-300 px-5 lg:px-6">
      <SeriesBoard>
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
              <ul className="text-grafito mt-4 text-[15px] leading-snug">
                {item.courses.map((course) => (
                  <li
                    key={course.id}
                    className="series-course -mx-2 px-2 py-1"
                    data-course={course.id}
                    data-series={seriesOf(course.id)}
                  >
                    {localizedCourseName(dict, course.id, course.name)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </SeriesBoard>
    </div>
  </div>
);
