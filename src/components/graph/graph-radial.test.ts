import { describe, expect, it } from "vitest";

import { buildHitGrid, findNear } from "./graph-hit";
import type { GraphEdge, GraphNode } from "./graph-model";
import { layoutRadial } from "./graph-radial";
import { RING_RADIUS } from "./graph-theme";

const edge = (a: string, b: string, id: string, label = "includes"): GraphEdge => ({
  a,
  b,
  id,
  label,
});

describe("radial layout", () => {
  it("pins the program at the origin and children on later rings", () => {
    const nodes: GraphNode[] = [
      { id: "program", kind: "program", label: "CSE", proximity: 0 },
      { id: "s1", kind: "semester", label: "Semester 1", order: 1, proximity: 1 },
      { id: "c1", kind: "course", label: "Calc", order: 1, proximity: 2 },
      { id: "sub", kind: "subject", label: "Limits", order: 1, proximity: 3 },
    ];
    const layout = layoutRadial(nodes, [
      edge("program", "s1", "e1"),
      edge("s1", "c1", "e2"),
      edge("c1", "sub", "e3"),
    ]);
    const program = layout.byId.get("program");
    const semester = layout.byId.get("s1");
    const course = layout.byId.get("c1");
    const subject = layout.byId.get("sub");
    if (!program || !semester || !course || !subject) {
      throw new Error("missing nodes");
    }
    expect(program.x).toBe(0);
    expect(program.y).toBe(0);
    expect(semester.radius).toBe(RING_RADIUS[1]);
    expect(course.radius).toBe(RING_RADIUS[2]);
    expect(subject.radius).toBe(RING_RADIUS[3]);
    expect(Math.hypot(semester.x, semester.y)).toBeCloseTo(RING_RADIUS[1]);
  });

  it("gives sibling semesters distinct angles", () => {
    const nodes: GraphNode[] = [
      { id: "program", kind: "program", label: "CSE", proximity: 0 },
      { id: "a", kind: "semester", label: "Semester 1", order: 1, proximity: 1 },
      { id: "b", kind: "semester", label: "Semester 2", order: 2, proximity: 1 },
    ];
    const layout = layoutRadial(nodes, [
      edge("program", "a", "e1"),
      edge("program", "b", "e2"),
      edge("a", "b", "e3", "next"),
    ]);
    const a = layout.byId.get("a");
    const b = layout.byId.get("b");
    if (!a || !b) {
      throw new Error("missing nodes");
    }
    expect(a.angle).not.toBe(b.angle);
    expect(layout.edges).toHaveLength(3);
  });
});

describe("hit grid", () => {
  it("returns the closest node inside the search radius", () => {
    const grid = buildHitGrid(
      [
        { id: "a", x: 0, y: 0 },
        { id: "b", x: 40, y: 0 },
      ],
      16
    );
    expect(findNear(grid, 2, 1, 8)?.id).toBe("a");
    expect(findNear(grid, 100, 100, 8)).toBeNull();
  });
});
