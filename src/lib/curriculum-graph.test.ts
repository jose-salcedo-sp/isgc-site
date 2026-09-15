import { describe, expect, it } from "vitest";

import curriculum from "@/data/curriculum.json";

import { curriculumGraph } from "./curriculum-graph";

describe("curriculum graph", () => {
  it("reads nodes, edges, and labels from curriculum.json", () => {
    expect(curriculumGraph.nodes.map((node) => node.id)).toStrictEqual(
      curriculum.graph.nodes.map((node) => node.id)
    );
    expect(curriculumGraph.edges).toStrictEqual(curriculum.graph.edges);
    expect(curriculumGraph.text.title).toBe(curriculum.graph.text.title);
    expect(curriculumGraph.text.kinds.course).toBe("Classes");
  });

  it("places the program, semesters, and classes on their rings", () => {
    const byId = new Map(curriculumGraph.nodes.map((node) => [node.id, node]));
    expect(byId.get("program")?.proximity).toBe(0);
    expect(byId.get("program")?.label).toBe("Computer Science and Engineering");
    expect(byId.get("semester-1")?.proximity).toBe(1);
    expect(byId.get("calculo-diferencial")?.proximity).toBe(2);
  });

  it("links every class to its semester", () => {
    const ids = new Set(curriculumGraph.nodes.map((node) => node.id));
    for (const course of curriculum.courses) {
      expect(ids.has(course.id)).toBeTruthy();
      expect(
        curriculumGraph.edges.some(
          (edge) =>
            edge.a === `semester-${course.semester}` && edge.b === course.id
        )
      ).toBeTruthy();
    }
  });
});
