import type { GraphKind } from "./graph-model";

export const RING_RADIUS = [0, 220, 480, 760] as const;

export const KIND_ORDER = [
  "program",
  "semester",
  "course",
  "subject",
] as const satisfies readonly GraphKind[];

export const KIND_LABEL = {
  course: "Classes",
  program: "Program",
  semester: "Semesters",
  subject: "Subjects",
} as const satisfies Record<GraphKind, string>;

export const nodeRadius = (kind: GraphKind, degree: number): number => {
  const base = kind === "program" ? 12 : kind === "semester" ? 5.5 : 2.4;
  return base + Math.sqrt(Math.max(degree, 1)) * 1.15;
};
