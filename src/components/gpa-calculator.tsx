"use client";

import { useState } from "react";

import type { Dictionary } from "@/lib/dictionary";
import { computeGpa } from "@/lib/gpa";
import { fill } from "@/lib/i18n";

const isValidGrade = (value: string) => {
  const grade = Number(value);
  return !Number.isNaN(grade) && grade >= 0 && grade <= 10;
};

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
    if (!value || !isValidGrade(value)) {
      return [];
    }
    return [{ credits: course.credits, grade: Number(value) }];
  });
  const result = computeGpa(gradedCourses);
  const semesterCourses = courses.filter(
    (course) => course.semester === semester
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <div>
        <label className="text-grafito flex flex-wrap items-center gap-4 text-lg font-semibold">
          {text.semester}
          <select
            value={semester}
            onChange={(event) => setSemester(Number(event.target.value))}
            className="border-grafito/25 text-grafito rounded-md border bg-white px-3 py-2 font-normal"
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
        <ul className="border-grafito/15 mt-6 border-t">
          {semesterCourses.map((course) => {
            const value = grades[course.id] ?? "";
            return (
              <li
                key={course.id}
                className="border-grafito/15 flex items-center justify-between gap-4 border-b py-4"
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
                  placeholder="0–10"
                  value={value}
                  aria-invalid={value !== "" && !isValidGrade(value)}
                  onChange={(event) =>
                    setGrades({ ...grades, [course.id]: event.target.value })
                  }
                  className="border-grafito/25 text-grafito aria-invalid:border-tinto w-24 shrink-0 rounded-md border bg-white px-3 py-2 text-right tabular-nums"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div aria-live="polite" className="lg:sticky lg:top-28 lg:self-start">
        <h3 className="text-grafito text-2xl sm:text-3xl">{text.result}</h3>
        {result ? (
          <>
            <p className="text-tinto mt-4 text-7xl leading-none font-bold tracking-[-0.05em] tabular-nums sm:text-8xl">
              {result.gpa.toFixed(2)}
            </p>
            <p className="text-grafito mt-6 text-lg font-semibold">
              {fill(text.average, { average: result.average.toFixed(2) })}
            </p>
            <p className="text-piedra mt-1">
              {fill(text.summary, {
                courses: gradedCourses.length,
                credits: result.credits,
              })}
            </p>
            <button
              type="button"
              onClick={() => setGrades({})}
              className="text-tinto decoration-dorado mt-6 font-semibold underline decoration-2 underline-offset-4"
            >
              {text.reset}
            </button>
          </>
        ) : (
          <p className="text-piedra mt-4 text-lg">{text.empty}</p>
        )}
        <p className="text-piedra border-grafito/15 mt-8 border-t pt-6 text-sm">
          {text.note}
        </p>
      </div>
    </div>
  );
};
