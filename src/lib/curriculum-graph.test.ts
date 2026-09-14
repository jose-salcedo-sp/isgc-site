import { describe, expect, it } from "vitest";

import type { CurriculumData } from "./curriculum-graph";
import { toCurriculumGraph } from "./curriculum-graph";

const sample = (): CurriculumData => ({
  courses: [
    {
      areas: ["math"],
      credits: 8,
      description: "Limits and derivatives.",
      id: "calc",
      kind: "required",
      name: "Calculus",
      semester: 1,
      subjects: [
        {
          description: "Limits",
          id: "limits",
          name: "Limits",
        },
      ],
    },
    {
      areas: ["software"],
      credits: 8,
      description: "Objects and classes.",
      id: "oop",
      kind: "required",
      name: "OOP",
      semester: 2,
    },
  ],
  program: {
    id: "isgc",
    name: "ISGC",
    nameEn: "Computer Science and Engineering",
    semesters: 2,
    summary: "Software and graphics.",
  },
});

describe("toCurriculumGraph", () => {
  it("places the program, semesters, classes, and subjects on successive rings", () => {
    const { nodes, edges } = toCurriculumGraph(sample());
    const byId = new Map(nodes.map((node) => [node.id, node]));
    expect(byId.get("program")?.proximity).toBe(0);
    expect(byId.get("program")?.label).toBe(
      "Computer Science and Engineering"
    );
    expect(byId.get("semester-1")?.proximity).toBe(1);
    expect(byId.get("calc")?.proximity).toBe(2);
    expect(byId.get("limits")?.proximity).toBe(3);
    expect(
      edges.some(
        (edge) => edge.a === "program" && edge.b === "semester-1"
      )
    ).toBe(true);
    expect(
      edges.some((edge) => edge.a === "semester-1" && edge.b === "semester-2")
    ).toBe(true);
    expect(
      edges.some((edge) => edge.a === "semester-1" && edge.b === "calc")
    ).toBe(true);
    expect(edges.some((edge) => edge.a === "calc" && edge.b === "limits")).toBe(
      true
    );
    expect(
      edges.some((edge) => edge.a === "calc" && edge.b === "oop")
    ).toBe(false);
  });
});
