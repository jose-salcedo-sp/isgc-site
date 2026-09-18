import type { GraphKind } from "./graph-model";

/** Where each ring's labels start. */
export const RING_RADIUS = [0, 200, 440] as const;

/** Outer end of each ring, where its links and dots sit. */
export const TIP_RADIUS = [0, 440, 900] as const;

/** Same-ring arcs bow this far past the outer edge at most. */
export const ARC_BASE = 40;
export const ARC_SPAN = 300;

export const KIND_ORDER = [
  "program",
  "semester",
  "course",
] as const satisfies readonly GraphKind[];

export const KIND_SWATCH = {
  course: "bg-graph-course",
  program: "bg-graph-program",
  semester: "bg-graph-semester",
} as const satisfies Record<GraphKind, string>;

export const nodeRadius = (kind: GraphKind, degree: number): number => {
  let base = 2.4;
  if (kind === "program") {
    base = 12;
  } else if (kind === "semester") {
    base = 5.5;
  }
  return base + Math.sqrt(Math.max(degree, 1)) * 1.15;
};
