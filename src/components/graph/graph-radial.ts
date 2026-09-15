import type { GraphEdge, GraphKind, GraphNode } from "./graph-model";
import { RING_RADIUS, TIP_RADIUS, nodeRadius } from "./graph-theme";

export interface RadialNeighbor {
  edge: string;
  edgeId: string;
  id: string;
}

export interface RadialNode {
  a0: number;
  a1: number;
  angle: number;
  credits?: number;
  degree: number;
  description?: string;
  id: string;
  kind: GraphKind;
  label: string;
  neighbors: RadialNeighbor[];
  order: number;
  proximity: number;
  r: number;
  radius: number;
  tip: number;
  tipX: number;
  tipY: number;
  x: number;
  y: number;
}

export interface RadialEdge {
  a: string;
  b: string;
  label: string;
  path: string;
}

export interface RadialLayout {
  byId: Map<string, RadialNode>;
  edges: RadialEdge[];
  kindCounts: Partial<Record<GraphKind, number>>;
  nodes: RadialNode[];
}

interface TreeNode {
  childIds: Set<string>;
  children: TreeNode[];
  data: RadialNode;
}

const ringIndex = (proximity: number): number =>
  Math.min(Math.max(proximity, 0), RING_RADIUS.length - 1);

const ringFor = (proximity: number): number =>
  RING_RADIUS[ringIndex(proximity)] ?? 0;

const tipFor = (proximity: number): number =>
  TIP_RADIUS[ringIndex(proximity)] ?? 0;

const polar = (angle: number, radius: number): [number, number] => [
  radius * Math.cos(angle - Math.PI / 2),
  radius * Math.sin(angle - Math.PI / 2),
];

export const radialLinkPath = (
  source: RadialNode,
  target: RadialNode
): string => {
  const mid = (source.angle + target.angle) / 2;
  const [x0, y0] = polar(source.angle, source.tip);
  const [cx1, cy1] = polar(mid, source.tip);
  const [cx2, cy2] = polar(mid, target.radius);
  const [x1, y1] = polar(target.angle, target.radius);
  return `M${x0},${y0}C${cx1},${cy1},${cx2},${cy2},${x1},${y1}`;
};

const TWO_PI = Math.PI * 2;

/** Finds the slice under a world point: inside its band and its angular wedge. */
export const pickSlice = (
  nodes: readonly RadialNode[],
  x: number,
  y: number
): RadialNode | null => {
  const radius = Math.hypot(x, y);
  const raw = Math.atan2(y, x) + Math.PI / 2;
  const angle = ((raw % TWO_PI) + TWO_PI) % TWO_PI;
  for (const node of nodes) {
    if (
      radius >= node.radius &&
      radius <= node.tip &&
      angle >= node.a0 &&
      angle < node.a1
    ) {
      return node;
    }
  }
  return null;
};

const leafCount = (node: TreeNode): number => {
  if (node.children.length === 0) {
    return 1;
  }
  let sum = 0;
  for (const child of node.children) {
    sum += leafCount(child);
  }
  return sum;
};

const assignAngles = (
  node: TreeNode,
  start: number,
  span: number,
  equal = false
): void => {
  node.data.angle = start + span / 2;
  node.data.a0 = start;
  node.data.a1 = start + span;
  const total = leafCount(node);
  let cursor = start;
  for (const child of node.children) {
    const childSpan = equal
      ? span / node.children.length
      : span * (leafCount(child) / total);
    assignAngles(child, cursor, childSpan);
    cursor += childSpan;
  }
};

const sortKids = (left: TreeNode, right: TreeNode): number => {
  const order = left.data.order - right.data.order;
  if (order !== 0) {
    return order;
  }
  return left.data.label.localeCompare(right.data.label);
};

const emptyLayout = (): RadialLayout => ({
  byId: new Map(),
  edges: [],
  kindCounts: {},
  nodes: [],
});

const seedNodes = (nodes: readonly GraphNode[]) => {
  const byId = new Map<string, RadialNode>();
  const trees = new Map<string, TreeNode>();
  const kindCounts: Partial<Record<GraphKind, number>> = {};
  for (const node of nodes) {
    if (byId.has(node.id)) {
      continue;
    }
    const placed: RadialNode = {
      a0: 0,
      a1: 0,
      angle: 0,
      credits: node.credits,
      degree: 0,
      description: node.description,
      id: node.id,
      kind: node.kind,
      label: node.label,
      neighbors: [],
      order: node.order ?? 0,
      proximity: node.proximity ?? (node.kind === "program" ? 0 : 4),
      r: 0,
      radius: 0,
      tip: 0,
      tipX: 0,
      tipY: 0,
      x: 0,
      y: 0,
    };
    byId.set(node.id, placed);
    trees.set(node.id, { childIds: new Set(), children: [], data: placed });
    kindCounts[node.kind] = (kindCounts[node.kind] ?? 0) + 1;
  }
  return { byId, kindCounts, trees };
};

const wireEdges = (
  byId: Map<string, RadialNode>,
  edges: readonly GraphEdge[]
): GraphEdge[] => {
  const kept: GraphEdge[] = [];
  const seenNb = new Set<string>();
  const seenPair = new Set<string>();
  const addNeighbor = (
    from: RadialNode,
    to: RadialNode,
    edge: GraphEdge
  ): void => {
    const key = `${from.id}>${to.id}`;
    if (seenNb.has(key)) {
      return;
    }
    seenNb.add(key);
    from.neighbors.push({ edge: edge.label, edgeId: edge.id, id: to.id });
  };
  for (const edge of edges) {
    const source = byId.get(edge.a);
    const target = byId.get(edge.b);
    if (!source || !target || source.id === target.id) {
      continue;
    }
    addNeighbor(source, target, edge);
    addNeighbor(target, source, edge);
    const pair =
      source.id < target.id
        ? `${source.id}:${target.id}`
        : `${target.id}:${source.id}`;
    if (seenPair.has(pair)) {
      continue;
    }
    seenPair.add(pair);
    kept.push(edge);
  }
  for (const node of byId.values()) {
    node.degree = node.neighbors.length;
    node.r = nodeRadius(node.kind, node.degree);
  }
  return kept;
};

const pushChild = (parent: TreeNode, child: TreeNode): boolean => {
  if (parent.childIds.has(child.data.id)) {
    return false;
  }
  parent.childIds.add(child.data.id);
  parent.children.push(child);
  return true;
};

const attachOrphans = (
  nodes: readonly GraphNode[],
  byId: Map<string, RadialNode>,
  trees: Map<string, TreeNode>,
  root: TreeNode,
  visited: Set<string>
): void => {
  for (const node of nodes) {
    if (visited.has(node.id)) {
      continue;
    }
    const orphan = trees.get(node.id);
    const placed = byId.get(node.id);
    if (!orphan || !placed) {
      continue;
    }
    let parent = root;
    for (const nb of placed.neighbors) {
      const nbNode = byId.get(nb.id);
      const nbTree = trees.get(nb.id);
      if (
        nbNode &&
        nbTree &&
        visited.has(nb.id) &&
        nbNode.proximity < placed.proximity
      ) {
        parent = nbTree;
        break;
      }
    }
    pushChild(parent, orphan);
    visited.add(node.id);
  }
};

const growTree = (
  rootId: string,
  byId: Map<string, RadialNode>,
  trees: Map<string, TreeNode>,
  visited: Set<string>
): TreeNode | null => {
  const rootTree = trees.get(rootId);
  if (!rootTree || visited.has(rootId)) {
    return null;
  }
  visited.add(rootId);
  const queue = [rootId];
  let head = 0;
  while (head < queue.length) {
    const curId = queue[head];
    head += 1;
    if (!curId) {
      continue;
    }
    const cur = byId.get(curId);
    const curTree = trees.get(curId);
    if (!cur || !curTree) {
      continue;
    }
    for (const nb of cur.neighbors) {
      if (visited.has(nb.id)) {
        continue;
      }
      const nbNode = byId.get(nb.id);
      const nbTree = trees.get(nb.id);
      if (!nbNode || !nbTree) {
        continue;
      }
      if (nbNode.proximity === cur.proximity + 1) {
        visited.add(nb.id);
        pushChild(curTree, nbTree);
        queue.push(nb.id);
      }
    }
  }
  return rootTree;
};

/** Anchors the innermost ring without drawing a node at the center. */
const hubTree = (): TreeNode => ({
  childIds: new Set(),
  children: [],
  data: {
    a0: 0,
    a1: 0,
    angle: 0,
    degree: 0,
    id: "",
    kind: "program",
    label: "",
    neighbors: [],
    order: 0,
    proximity: 0,
    r: 0,
    radius: 0,
    tip: 0,
    tipX: 0,
    tipY: 0,
    x: 0,
    y: 0,
  },
});

const walkSort = (node: TreeNode): void => {
  node.children.sort(sortKids);
  for (const child of node.children) {
    walkSort(child);
  }
};

const placeXY = (byId: Map<string, RadialNode>): void => {
  for (const node of byId.values()) {
    node.radius = ringFor(node.proximity);
    node.tip = tipFor(node.proximity);
    const [x, y] = polar(node.angle, node.radius);
    node.x = x;
    node.y = y;
    const [tx, ty] = polar(node.angle, node.tip);
    node.tipX = tx;
    node.tipY = ty;
  }
};

const edgePaths = (
  kept: readonly GraphEdge[],
  byId: Map<string, RadialNode>
): RadialEdge[] => {
  const radialEdges: RadialEdge[] = [];
  for (const edge of kept) {
    const source = byId.get(edge.a);
    const target = byId.get(edge.b);
    if (!source || !target) {
      continue;
    }
    radialEdges.push({
      a: edge.a,
      b: edge.b,
      label: edge.label,
      path: radialLinkPath(source, target),
    });
  }
  return radialEdges;
};

export const layoutRadial = (
  nodes: readonly GraphNode[],
  edges: readonly GraphEdge[]
): RadialLayout => {
  if (nodes.length === 0) {
    return emptyLayout();
  }
  const { byId, kindCounts, trees } = seedNodes(nodes);
  const kept = wireEdges(byId, edges);
  const inner = Math.min(...[...byId.values()].map((node) => node.proximity));
  const visited = new Set<string>();
  const hub = hubTree();
  for (const node of nodes) {
    if (byId.get(node.id)?.proximity !== inner) {
      continue;
    }
    const tree = growTree(node.id, byId, trees, visited);
    if (tree) {
      pushChild(hub, tree);
    }
  }
  if (hub.children.length === 0) {
    return { byId, edges: [], kindCounts, nodes: [] };
  }
  attachOrphans(nodes, byId, trees, hub, visited);
  walkSort(hub);
  assignAngles(hub, 0, Math.PI * 2, true);
  placeXY(byId);
  return {
    byId,
    edges: edgePaths(kept, byId),
    kindCounts,
    nodes: [...byId.values()],
  };
};
