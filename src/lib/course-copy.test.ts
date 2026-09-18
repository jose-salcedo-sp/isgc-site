import { describe, expect, it } from "vitest";

import curriculum from "@/data/curriculum.json";
import { localizedCourseName, localizedGraphNodes } from "@/lib/course-copy";
import { getDictionary } from "@/lib/dictionary";

describe("course copy", () => {
  const es = getDictionary("es");
  const enGB = getDictionary("en-GB");

  it("localizes course labels and descriptions for English", () => {
    const nodes = localizedGraphNodes(
      [
        {
          description: "Spanish description",
          id: "calculo-diferencial",
          kind: "course",
          label: "Cálculo Diferencial",
          proximity: 2,
        },
      ],
      enGB,
      []
    );
    expect(nodes[0]?.label).toBe("Differential Calculus");
    expect(nodes[0]?.description).toBe(
      enGB.courses["calculo-diferencial"]?.description
    );
  });

  it("localizes semester labels from the page copy", () => {
    const nodes = localizedGraphNodes(
      [
        {
          id: "semester-1",
          kind: "semester",
          label: "1er Semestre",
          order: 1,
          proximity: 1,
        },
      ],
      enGB,
      enGB.pages.carrera.semesterLabels
    );
    expect(nodes[0]?.label).toBe("1st Semester");
  });

  it("covers every curriculum course in the Spanish dictionary", () => {
    for (const course of curriculum.courses) {
      expect(es.courses[course.id]?.name).toBe(course.name);
      expect(localizedCourseName(es, course.id, "")).toBe(course.name);
    }
  });
});
