export type GraphKind = "program" | "semester" | "course";

export interface GraphText {
  close: string;
  connectionMany: string;
  connectionOne: string;
  continues: string;
  credits: string;
  inPlan: string;
  kinds: Record<GraphKind, string>;
  noLinks: string;
  search: string;
  searchLabel: string;
  thisSemester: string;
  title: string;
}

export interface GraphNode {
  credits?: number;
  description?: string;
  id: string;
  kind: GraphKind;
  label: string;
  order?: number;
  proximity?: number;
}

export interface GraphEdge {
  a: string;
  b: string;
  id: string;
  label: string;
}
