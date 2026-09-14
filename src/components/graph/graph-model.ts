export type GraphKind = "program" | "semester" | "course" | "subject";

export interface GraphNode {
  credits?: number | null;
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
