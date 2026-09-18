import type { GraphNode } from "@/components/graph/graph-model";
import type { Dictionary } from "@/lib/dictionary";

export const localizedGraphNodes = (
  nodes: GraphNode[],
  dict: Dictionary,
  semesterLabels: readonly string[]
): GraphNode[] =>
  nodes.map((node) => {
    if (node.kind === "semester" && node.order !== undefined) {
      return {
        ...node,
        label: semesterLabels[node.order - 1] ?? node.label,
      };
    }
    if (node.kind !== "course") {
      return node;
    }
    const copy = dict.courses[node.id];
    if (!copy) {
      return node;
    }
    return {
      ...node,
      description: copy.description,
      label: copy.name,
    };
  });

export const localizedCourseName = (
  dict: Dictionary,
  courseId: string,
  fallback: string
): string => dict.courses[courseId]?.name ?? fallback;
