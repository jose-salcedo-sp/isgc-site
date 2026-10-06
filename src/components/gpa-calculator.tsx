"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/dictionary";
import { computeGpa } from "@/lib/gpa";
import { fill } from "@/lib/i18n";

export const GpaCalculator = ({
  courses,
  semesterLabels,
  text,
}: {
  courses: { credits: number; id: string; name: string; semester: number }[];
  semesterLabels: string[];
  text: Dictionary["pages"]["carrera"]["gpa"];
}) => {
  const [semester, setSemester] = useState(1);
  const [grades, setGrades] = useState<Record<string, string>>({});

  const gradedCourses = courses.flatMap((course) => {
    const value = grades[course.id];
    if (!value) {
      return [];
    }
    const grade = Number(value);
    if (Number.isNaN(grade) || grade < 0 || grade > 10) {
      return [];
    }
    return [{ credits: course.credits, grade }];
  });
  const result = computeGpa(gradedCourses);
  const semesterCourses = courses.filter(
    (course) => course.semester === semester
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-card shadow-soft/50 bg-white p-6">
        <label className="text-grafito flex flex-wrap items-center gap-3 font-semibold">
          {text.semester}
          <select
            value={semester}
            onChange={(event) => setSemester(Number(event.target.value))}
            className="bg-marfil text-grafito rounded-full px-4 py-2 font-normal"
          >
            {semesterLabels.map((label, index) =>
              courses.some((course) => course.semester === index + 1) ? (
                <option key={label} value={index + 1}>
                  {label}
                </option>
              ) : null
            )}
          </select>
        </label>
        <ul className="divide-marfil-2 mt-4 divide-y">
          {semesterCourses.map((course) => (
            <li
              key={course.id}
              className="flex items-center justify-between gap-4 py-3"
            >
              <label htmlFor={`gpa-${course.id}`} className="text-grafito">
                {course.name}
                <span className="text-piedra block text-sm">
                  {fill(text.credits, { n: course.credits })}
                </span>
              </label>
              <input
                id={`gpa-${course.id}`}
                type="number"
                inputMode="decimal"
                min={0}
                max={10}
                step={0.1}
                placeholder="—"
                value={grades[course.id] ?? ""}
                onChange={(event) =>
                  setGrades({ ...grades, [course.id]: event.target.value })
                }
                className="bg-marfil text-grafito w-24 shrink-0 rounded-full px-4 py-2 text-right"
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        aria-live="polite"
        className="rounded-card shadow-soft/50 self-start bg-white p-6 lg:sticky lg:top-24"
      >
        <h3 className="text-grafito font-serif text-2xl">{text.result}</h3>
        {result ? (
          <>
            <p className="text-tinto mt-3 font-serif text-6xl">
              {result.gpa.toFixed(2)}
            </p>
            <p className="text-grafito mt-4 font-semibold">
              {fill(text.average, { average: result.average.toFixed(2) })}
            </p>
            <p className="text-piedra mt-1 text-sm">
              {fill(text.summary, {
                courses: gradedCourses.length,
                credits: result.credits,
              })}
            </p>
            <button
              type="button"
              onClick={() => setGrades({})}
              className="text-tinto decoration-dorado mt-5 font-semibold underline decoration-2 underline-offset-4"
            >
              {text.reset}
            </button>
          </>
        ) : (
          <p className="text-piedra mt-3">{text.empty}</p>
        )}
        <p className="text-piedra mt-6 text-sm">{text.note}</p>
      </div>
    </div>
  );
};
