import type { GraphEdge, GraphNode } from "@/components/graph/graph-model";

export interface CurriculumSubject {
  description?: string;
  id: string;
  name: string;
}

export interface CurriculumCourse {
  areas: string[];
  credits: number | null;
  description: string;
  id: string;
  kind: string;
  name: string;
  semester: number;
  subjects?: CurriculumSubject[];
}

export interface CurriculumData {
  courses: CurriculumCourse[];
  program: {
    id: string;
    name: string;
    nameEn: string;
    semesters: number;
    summary: string;
  };
}

export interface CurriculumGraph {
  edges: GraphEdge[];
  nodes: GraphNode[];
}

const semesterId = (n: number) => `semester-${n}`;

const pushEdge = (
  edges: GraphEdge[],
  seen: Set<string>,
  a: string,
  b: string,
  label: string
) => {
  const pair = a < b ? `${a}:${b}` : `${b}:${a}`;
  if (a === b || seen.has(pair)) {
    return;
  }
  seen.add(pair);
  edges.push({ a, b, id: `e:${a}:${b}`, label });
};

const chain = (
  edges: GraphEdge[],
  seen: Set<string>,
  ids: readonly string[],
  label: string
) => {
  for (let i = 0; i < ids.length - 1; i += 1) {
    const left = ids[i];
    const right = ids[i + 1];
    if (left && right) {
      pushEdge(edges, seen, left, right, label);
    }
  }
};

export const toCurriculumGraph = (data: CurriculumData): CurriculumGraph => {
  const nodes: GraphNode[] = [
    {
      description: data.program.summary,
      id: "program",
      kind: "program",
      label: data.program.nameEn,
      order: 0,
      proximity: 0,
    },
  ];
  const edges: GraphEdge[] = [];
  const seen = new Set<string>();
  const semesterIds: string[] = [];

  for (let n = 1; n <= data.program.semesters; n += 1) {
    const id = semesterId(n);
    semesterIds.push(id);
    nodes.push({
      id,
      kind: "semester",
      label: `Semester ${n}`,
      order: n,
      proximity: 1,
    });
    pushEdge(edges, seen, "program", id, "includes");
  }
  chain(edges, seen, semesterIds, "next");

  const bySemester = new Map<number, string[]>();
  const subjectNodes = new Map<string, GraphNode>();

  for (const [index, course] of data.courses.entries()) {
    nodes.push({
      credits: course.credits,
      description: course.description,
      id: course.id,
      kind: "course",
      label: course.name,
      order: index,
      proximity: 2,
    });
    const sid = semesterId(course.semester);
    pushEdge(edges, seen, sid, course.id, "includes");
    const group = bySemester.get(course.semester) ?? [];
    group.push(course.id);
    bySemester.set(course.semester, group);

    const subjectIds: string[] = [];
    for (const [sIndex, subject] of (course.subjects ?? []).entries()) {
      subjectIds.push(subject.id);
      if (!subjectNodes.has(subject.id)) {
        const placed: GraphNode = {
          description: subject.description,
          id: subject.id,
          kind: "subject",
          label: subject.name,
          order: sIndex,
          proximity: 3,
        };
        subjectNodes.set(subject.id, placed);
        nodes.push(placed);
      }
      pushEdge(edges, seen, course.id, subject.id, "covers");
    }
    chain(edges, seen, subjectIds, "next");
  }

  for (const ids of bySemester.values()) {
    chain(edges, seen, ids, "next");
  }

  return { edges, nodes };
};
