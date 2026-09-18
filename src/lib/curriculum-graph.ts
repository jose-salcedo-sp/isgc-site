import type {
  GraphEdge,
  GraphKind,
  GraphNode,
  GraphText,
} from "@/components/graph/graph-model";
import curriculum from "@/data/curriculum.json";

const graphKind = (kind: string): GraphKind => {
  if (kind === "course" || kind === "program" || kind === "semester") {
    return kind;
  }
  throw new Error(`Unknown graph kind: ${kind}`);
};

export const curriculumGraph = {
  edges: curriculum.graph.edges,
  nodes: curriculum.graph.nodes.map((node) => ({
    ...node,
    kind: graphKind(node.kind),
  })),
  text: {
    ...curriculum.graph.text,
    kinds: {
      course: curriculum.graph.text.kinds.course,
      program: curriculum.graph.text.kinds.program,
      semester: curriculum.graph.text.kinds.semester,
    },
  },
} satisfies {
  edges: GraphEdge[];
  nodes: GraphNode[];
  text: GraphText;
};
