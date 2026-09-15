import type { GraphKind } from "./graph-model";

export const RING_RADIUS = [0, 220, 480, 760] as const;

export const KIND_ORDER = [
  "program",
  "semester",
  "course",
  "subject",
] as const satisfies readonly GraphKind[];

export const KIND_SWATCH = {
  course: "bg-graph-course",
  program: "bg-graph-program",
  semester: "bg-graph-semester",
  subject: "bg-graph-subject",
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
