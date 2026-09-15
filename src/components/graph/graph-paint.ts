import type { GraphKind } from "./graph-model";
import type { RadialLayout, RadialNode } from "./graph-radial";
import { RING_RADIUS } from "./graph-theme";

export interface Transform {
  k: number;
  x: number;
  y: number;
}

export interface Palette {
  bg: string;
  ink: string;
  kinds: Record<GraphKind, string>;
  ring: string;
}

export const MIN_K = 0.05;
export const MAX_K = 12;
const LABEL_ZOOM = 1.6;

export const clampK = (value: number): number =>
  Math.min(MAX_K, Math.max(MIN_K, value));

const fallbackKind = (css: CSSStyleDeclaration, kind: GraphKind): string =>
  css.getPropertyValue(`--graph-${kind}`).trim() ||
  css.getPropertyValue("--foreground").trim() ||
  "#5a54c9";

export const readPalette = (root: HTMLElement): Palette => {
  const css = getComputedStyle(root);
  return {
    bg: css.getPropertyValue("--background").trim() || "#f5f4f9",
    ink: css.getPropertyValue("--foreground").trim() || "#1e1b2e",
    kinds: {
      course: fallbackKind(css, "course"),
      program: fallbackKind(css, "program"),
      semester: fallbackKind(css, "semester"),
      subject: fallbackKind(css, "subject"),
    },
    ring: css.getPropertyValue("--graph-ring").trim() || "rgba(0,0,0,0.08)",
  };
};

const HEX = /^#(?<body>[\da-f]{3}|[\da-f]{6})$/iu;

export const withAlpha = (color: string, alpha: number): string => {
  const hex = HEX.exec(color.trim());
  const raw = hex?.groups?.body;
  if (!raw) {
    return color;
  }
  const body =
    raw.length === 3 ? [...raw].map((ch) => `${ch}${ch}`).join("") : raw;
  const r = Number.parseInt(body.slice(0, 2), 16);
  const g = Number.parseInt(body.slice(2, 4), 16);
  const b = Number.parseInt(body.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const offscreen = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  left: number,
  right: number,
  top: number,
  bottom: number
): boolean =>
  (ax < left && bx < left) ||
  (ax > right && bx > right) ||
  (ay < top && by < top) ||
  (ay > bottom && by > bottom);

const strokeEdges = (
  ctx: CanvasRenderingContext2D,
  layout: RadialLayout,
  paths: readonly Path2D[],
  kinds: ReadonlySet<GraphKind>,
  hubs: ReadonlySet<string> | null,
  highlight: ReadonlySet<string> | null,
  palette: Palette,
  inv: number,
  box: { bottom: number; left: number; right: number; top: number }
): void => {
  for (const [index, edge] of layout.edges.entries()) {
    const source = layout.byId.get(edge.a);
    const target = layout.byId.get(edge.b);
    const path = paths[index];
    if (!source || !target || !path) {
      continue;
    }
    if (!kinds.has(source.kind) || !kinds.has(target.kind)) {
      continue;
    }
    if (
      offscreen(
        source.x,
        source.y,
        target.x,
        target.y,
        box.left,
        box.right,
        box.top,
        box.bottom
      )
    ) {
      continue;
    }
    let alpha = 0.12;
    if (hubs && highlight) {
      alpha = hubs.has(edge.a) || hubs.has(edge.b) ? 0.85 : 0.03;
    }
    if (alpha < 0.02) {
      continue;
    }
    ctx.strokeStyle = withAlpha(palette.kinds[source.kind], alpha);
    ctx.lineWidth =
      (hubs && (hubs.has(source.id) || hubs.has(target.id)) ? 1.4 : 0.7) * inv;
    ctx.stroke(path);
  }
};

const focusHubs = (
  selected: string | null,
  hovered: string | null
): Set<string> | null => {
  if (!selected && !hovered) {
    return null;
  }
  const hubs = new Set<string>();
  if (selected) {
    hubs.add(selected);
  }
  if (hovered) {
    hubs.add(hovered);
  }
  return hubs;
};

const highlightAround = (
  layout: RadialLayout,
  hubs: ReadonlySet<string> | null
): Set<string> | null => {
  if (!hubs) {
    return null;
  }
  const highlight = new Set(hubs);
  for (const id of hubs) {
    const node = layout.byId.get(id);
    if (!node) {
      continue;
    }
    for (const nb of node.neighbors) {
      highlight.add(nb.id);
    }
  }
  return highlight;
};

const nodeAlpha = (
  node: RadialNode,
  matches: ReadonlySet<string> | null,
  highlight: ReadonlySet<string> | null
): number => {
  let alpha = 1;
  if (highlight && !highlight.has(node.id)) {
    alpha = 0.12;
  }
  if (matches && !matches.has(node.id)) {
    alpha *= 0.1;
  }
  return alpha;
};

const fillNodes = (
  ctx: CanvasRenderingContext2D,
  nodes: readonly RadialNode[],
  kinds: ReadonlySet<GraphKind>,
  matches: ReadonlySet<string> | null,
  selected: string | null,
  hovered: string | null,
  highlight: ReadonlySet<string> | null,
  palette: Palette,
  t: Transform,
  inv: number,
  box: { bottom: number; left: number; right: number; top: number }
): void => {
  const showLabels = t.k > LABEL_ZOOM;
  const minScreen = 0.6 * inv;
  ctx.textBaseline = "middle";
  for (const node of nodes) {
    if (!kinds.has(node.kind)) {
      continue;
    }
    if (
      node.x < box.left ||
      node.x > box.right ||
      node.y < box.top ||
      node.y > box.bottom
    ) {
      continue;
    }
    const alpha = nodeAlpha(node, matches, highlight);
    const force =
      node.id === selected ||
      node.id === hovered ||
      node.kind === "program" ||
      node.kind === "semester";
    if (!force && node.r < minScreen && t.k < 0.35) {
      continue;
    }
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
    ctx.fillStyle = withAlpha(palette.kinds[node.kind], alpha);
    ctx.fill();
    if (node.id === selected || node.id === hovered) {
      ctx.lineWidth = 2 * inv;
      ctx.strokeStyle = palette.ink;
      ctx.stroke();
    }
    if ((showLabels || force) && alpha > 0.5) {
      ctx.font = `${(force ? 13 : 10.5) * inv}px ui-sans-serif, system-ui, sans-serif`;
      ctx.fillStyle = withAlpha(palette.ink, alpha);
      ctx.fillText(node.label, node.x + node.r + 4 * inv, node.y);
    }
  }
};

export const paintGraph = (input: {
  canvas: HTMLCanvasElement;
  hoveredId: string | null;
  kinds: ReadonlySet<GraphKind>;
  layout: RadialLayout;
  matches: ReadonlySet<string> | null;
  palette: Palette;
  paths: readonly Path2D[];
  selectedId: string | null;
  size: { dpr: number; h: number; w: number };
  transform: Transform;
}): void => {
  const ctx = input.canvas.getContext("2d");
  if (!ctx) {
    return;
  }
  const { dpr, h, w } = input.size;
  const t = input.transform;
  const selected = input.selectedId;
  const hubs = focusHubs(selected, input.hoveredId);
  const highlight = highlightAround(input.layout, hubs);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = input.palette.bg;
  ctx.fillRect(0, 0, w, h);
  ctx.save();
  ctx.translate(w / 2 + t.x, h / 2 + t.y);
  ctx.scale(t.k, t.k);
  const inv = 1 / t.k;
  const pad = 48 * inv;
  const box = {
    bottom: (h / 2 - t.y) * inv + pad,
    left: (-w / 2 - t.x) * inv - pad,
    right: (w / 2 - t.x) * inv + pad,
    top: (-h / 2 - t.y) * inv - pad,
  };
  for (const radius of RING_RADIUS) {
    if (!radius) {
      continue;
    }
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.strokeStyle = input.palette.ring;
    ctx.lineWidth = inv;
    ctx.stroke();
  }
  strokeEdges(
    ctx,
    input.layout,
    input.paths,
    input.kinds,
    hubs,
    highlight,
    input.palette,
    inv,
    box
  );
  fillNodes(
    ctx,
    input.layout.nodes,
    input.kinds,
    input.matches,
    selected,
    input.hoveredId,
    highlight,
    input.palette,
    t,
    inv,
    box
  );
  ctx.restore();
};

export const zoomAt = (
  transform: Transform,
  mx: number,
  my: number,
  size: { h: number; w: number },
  deltaY: number
): void => {
  const wx = (mx - size.w / 2 - transform.x) / transform.k;
  const wy = (my - size.h / 2 - transform.y) / transform.k;
  const nextK = clampK(transform.k * 2 ** (-deltaY / 240));
  transform.k = nextK;
  transform.x = mx - size.w / 2 - wx * nextK;
  transform.y = my - size.h / 2 - wy * nextK;
};

export const FOCUS_K = 2.8;
const INSPECTOR_RESERVE_X = 336;
const INSPECTOR_RESERVE_Y = 288;
const COMPACT_W = 768;

export const focusOn = (
  wx: number,
  wy: number,
  currentK: number,
  size: { h: number; w: number }
): Transform => {
  const k = clampK(Math.max(currentK, FOCUS_K));
  const wide = size.w >= COMPACT_W;
  const reserveX = wide ? Math.min(INSPECTOR_RESERVE_X, size.w * 0.42) : 0;
  const reserveY = wide ? 0 : Math.min(INSPECTOR_RESERVE_Y, size.h * 0.4);
  const sx = (size.w - reserveX) / 2;
  const sy = (size.h - reserveY) / 2;
  return {
    k,
    x: sx - size.w / 2 - wx * k,
    y: sy - size.h / 2 - wy * k,
  };
};

const FOCUS_MS = 220;

export const playFocus = (
  transform: Transform,
  to: Transform,
  reduced: boolean,
  onTick: () => void
): (() => void) => {
  if (reduced) {
    transform.k = to.k;
    transform.x = to.x;
    transform.y = to.y;
    onTick();
    return () => {
      /* no pending frame */
    };
  }
  const from = { k: transform.k, x: transform.x, y: transform.y };
  const handle = { id: 0 };
  const t0 = performance.now();
  const step = (now: number) => {
    const u = Math.min(1, (now - t0) / FOCUS_MS);
    const e = 1 - (1 - u) ** 3;
    transform.k = from.k + (to.k - from.k) * e;
    transform.x = from.x + (to.x - from.x) * e;
    transform.y = from.y + (to.y - from.y) * e;
    onTick();
    if (u < 1) {
      handle.id = requestAnimationFrame(step);
    }
  };
  handle.id = requestAnimationFrame(step);
  return () => cancelAnimationFrame(handle.id);
};
