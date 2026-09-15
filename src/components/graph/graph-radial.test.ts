import { describe, expect, it } from "vitest";

import type { GraphEdge, GraphNode } from "./graph-model";
import { layoutRadial, pickSlice, radialLinkPath } from "./graph-radial";
import { RING_RADIUS } from "./graph-theme";

const edge = (
  a: string,
  b: string,
  id: string,
  label = "includes"
): GraphEdge => ({
  a,
  b,
  id,
  label,
});

describe("radial layout", () => {
  it("pins the program at the origin and children on later rings", () => {
    const nodes: GraphNode[] = [
      { id: "program", kind: "program", label: "CSE", proximity: 0 },
      {
        id: "s1",
        kind: "semester",
        label: "Semester 1",
        order: 1,
        proximity: 1,
      },
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
  });

  it("splits the innermost ring into equal slices regardless of class count", () => {
    const nodes: GraphNode[] = [
      {
        id: "a",
        kind: "semester",
        label: "Semester 1",
        order: 1,
        proximity: 1,
      },
      {
        id: "b",
        kind: "semester",
        label: "Semester 2",
        order: 2,
        proximity: 1,
      },
      { id: "c1", kind: "course", label: "Calc", order: 1, proximity: 2 },
      { id: "c2", kind: "course", label: "Algebra", order: 2, proximity: 2 },
      { id: "c3", kind: "course", label: "Physics", order: 1, proximity: 2 },
    ];
    const layout = layoutRadial(nodes, [
      edge("a", "c1", "e1"),
      edge("a", "c2", "e2"),
      edge("b", "c3", "e3"),
    ]);
    const a = layout.byId.get("a");
    const b = layout.byId.get("b");
    if (!a || !b) {
      throw new Error("missing nodes");
    }
    expect(a.angle).toBeCloseTo(Math.PI / 2);
    expect(b.angle).toBeCloseTo((3 * Math.PI) / 2);
    expect(a.radius).toBe(RING_RADIUS[1]);
  });

  it("gives sibling semesters distinct angles", () => {
    const nodes: GraphNode[] = [
      { id: "program", kind: "program", label: "CSE", proximity: 0 },
      {
        id: "a",
        kind: "semester",
        label: "Semester 1",
        order: 1,
        proximity: 1,
      },
      {
        id: "b",
        kind: "semester",
        label: "Semester 2",
        order: 2,
        proximity: 1,
      },
    ];
    const layout = layoutRadial(nodes, [
      edge("program", "a", "e1"),
      edge("program", "b", "e2"),
    ]);
    const a = layout.byId.get("a");
    const b = layout.byId.get("b");
    if (!a || !b) {
      throw new Error("missing nodes");
    }
    expect(a.angle).not.toBe(b.angle);
    expect(layout.edges).toHaveLength(2);
  });
});

describe("links between slices on the same ring", () => {
  it("stays outside the outer ring along the whole arc", () => {
    const nodes: GraphNode[] = [
      { id: "a", kind: "subject", label: "A", order: 1, proximity: 3 },
      { id: "b", kind: "subject", label: "B", order: 2, proximity: 3 },
      { id: "c", kind: "subject", label: "C", order: 3, proximity: 3 },
    ];
    const layout = layoutRadial(nodes, []);
    const a = layout.byId.get("a");
    const c = layout.byId.get("c");
    if (!a || !c) {
      throw new Error("missing nodes");
    }
    const points = radialLinkPath(a, c)
      .slice(1)
      .split("L")
      .map((pair) => pair.split(",").map(Number));
    expect(points.length).toBeGreaterThan(8);
    for (const [x, y] of points) {
      expect(Math.hypot(x ?? 0, y ?? 0)).toBeGreaterThanOrEqual(a.tip - 0.001);
    }
  });
});

describe("slice picking", () => {
  const nodes: GraphNode[] = [
    { id: "a", kind: "semester", label: "Semester 1", order: 1, proximity: 1 },
    { id: "b", kind: "semester", label: "Semester 2", order: 2, proximity: 1 },
  ];
  const layout = layoutRadial(nodes, []);

  it("returns the slice whose band and wedge contain the point", () => {
    const a = layout.byId.get("a");
    if (!a) {
      throw new Error("missing node");
    }
    const mid = (a.radius + a.tip) / 2;
    expect(pickSlice(layout.nodes, mid, 0)?.id).toBe("a");
    expect(pickSlice(layout.nodes, -mid, 0)?.id).toBe("b");
  });

  it("returns null inside the hole and outside the outer ring", () => {
    expect(pickSlice(layout.nodes, 0, 0)).toBeNull();
    expect(pickSlice(layout.nodes, 9000, 0)).toBeNull();
  });
});
