import type { GraphKind } from "./graph-model";
import type { RadialLayout, RadialNode } from "./graph-radial";

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

export const clampK = (value: number): number =>
  Math.min(MAX_K, Math.max(MIN_K, value));

const fallbackKind = (css: CSSStyleDeclaration, kind: GraphKind): string =>
  css.getPropertyValue(`--graph-${kind}`).trim() ||
  css.getPropertyValue("--foreground").trim() ||
  "#8a1538";

export const readPalette = (root: HTMLElement): Palette => {
  const css = getComputedStyle(root);
  return {
    bg: css.getPropertyValue("--background").trim() || "#f7f4ee",
    ink: css.getPropertyValue("--foreground").trim() || "#262326",
    kinds: {
      course: fallbackKind(css, "course"),
      program: fallbackKind(css, "program"),
      semester: fallbackKind(css, "semester"),
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

/** Slice borders are the slice's own color, darkened. */
export const shade = (color: string, factor: number): string => {
  const hex = HEX.exec(color.trim());
  const raw = hex?.groups?.body;
  if (!raw) {
    return color;
  }
  const body =
    raw.length === 3 ? [...raw].map((ch) => `${ch}${ch}`).join("") : raw;
  const channel = (at: number): number =>
    Math.round(Number.parseInt(body.slice(at, at + 2), 16) * factor);
  return `rgb(${channel(0)},${channel(2)},${channel(4)})`;
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
  core: ReadonlySet<string> | null,
  palette: Palette,
  inv: number,
  box: { bottom: number; left: number; right: number; top: number },
  progress: number
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
    if (Math.abs(source.proximity - target.proximity) === 1) {
      continue;
    }
    if (!(core?.has(edge.a) || core?.has(edge.b))) {
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
    ctx.strokeStyle = withAlpha(palette.kinds.semester, 0.95);
    ctx.lineWidth = 1.8 * inv;
    ctx.setLineDash([edge.length, edge.length]);
    ctx.lineDashOffset = edge.length * (1 - progress);
    ctx.stroke(path);
    ctx.setLineDash([]);
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

/** A slice lights up together with everything nested inside it. */
const nestedUnder = (
  layout: RadialLayout,
  hubs: ReadonlySet<string>
): Set<string> => {
  const core = new Set(hubs);
  const queue = [...hubs];
  let head = 0;
  while (head < queue.length) {
    const id = queue[head];
    head += 1;
    const node = id ? layout.byId.get(id) : undefined;
    if (!node) {
      continue;
    }
    for (const nb of node.neighbors) {
      const child = layout.byId.get(nb.id);
      if (!child || child.proximity <= node.proximity || core.has(nb.id)) {
        continue;
      }
      core.add(nb.id);
      queue.push(nb.id);
    }
  }
  return core;
};

/**
 * Classes also pull in the classes they relate to; semesters stay inside
 * their own wedge, so their relations are neither lit nor drawn.
 */
interface FocusSets {
  core: Set<string> | null;
  highlight: Set<string> | null;
}

const focusSets = (
  layout: RadialLayout,
  hubs: ReadonlySet<string> | null
): FocusSets => {
  if (!hubs) {
    return { core: null, highlight: null };
  }
  const core = nestedUnder(layout, hubs);
  const highlight = new Set(core);
  for (const id of core) {
    const node = layout.byId.get(id);
    for (const nb of node?.neighbors ?? []) {
      if (layout.byId.get(nb.id)?.proximity === node?.proximity) {
        highlight.add(nb.id);
      }
    }
  }
  return { core, highlight };
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

const RADIAL_LABEL_GAP = 8;

/** Semesters and classes read outward along their own slice instead of on a dot. */
const paintRadialLabel = (
  ctx: CanvasRenderingContext2D,
  node: RadialNode,
  color: string,
  alpha: number,
  emphasis: boolean,
  size = 12.5
): void => {
  const flip = Math.cos(node.angle - Math.PI / 2) < 0;
  ctx.save();
  ctx.rotate(node.angle - Math.PI / 2);
  ctx.translate(node.radius, 0);
  if (flip) {
    ctx.rotate(Math.PI);
  }
  ctx.textAlign = flip ? "right" : "left";
  const weight = emphasis ? 700 : 600;
  const face = "Satoshi, ui-sans-serif, system-ui, sans-serif";
  ctx.font = `${weight} ${size}px ${face}`;
  const room = node.tip - node.radius - RADIAL_LABEL_GAP * 2;
  const full = ctx.measureText(node.label).width;
  if (full > room) {
    ctx.font = `${weight} ${size * (room / full)}px ${face}`;
  }
  ctx.fillStyle = withAlpha(color, alpha);
  const gap = RADIAL_LABEL_GAP;
  const x = flip ? -gap : gap;
  ctx.fillText(node.label, x, 0);
  ctx.restore();
};

/** Anchor dot where a class ring ends and its outward links begin. */
const paintTip = (
  ctx: CanvasRenderingContext2D,
  node: RadialNode,
  color: string,
  alpha: number,
  inv: number,
  emphasis: boolean,
  ink: string
): void => {
  ctx.beginPath();
  ctx.arc(node.tipX, node.tipY, emphasis ? 9 : 6, 0, Math.PI * 2);
  ctx.fillStyle = withAlpha(color, alpha);
  ctx.fill();
  if (emphasis) {
    ctx.lineWidth = Math.max(1.5 * inv, 2);
    ctx.strokeStyle = withAlpha(ink, alpha);
    ctx.stroke();
  }
};

/** Label heights in world pixels, so titles grow and shrink with the zoom. */
const LABEL_SIZE: Partial<Record<GraphKind, number>> = {
  course: 26,
  semester: 46,
};

const paintSliceNode = (
  ctx: CanvasRenderingContext2D,
  node: RadialNode,
  opts: {
    alpha: number;
    emphasis: boolean;
    inv: number;
    lit: boolean;
    palette: Palette;
  }
): void => {
  const { alpha, emphasis, inv, palette } = opts;
  const color = palette.kinds[node.kind];
  paintRadialLabel(
    ctx,
    node,
    color,
    alpha,
    emphasis,
    LABEL_SIZE[node.kind] ?? 11
  );
  if (node.kind === "course") {
    const dot = opts.lit ? palette.kinds.semester : color;
    paintTip(ctx, node, dot, alpha, inv, emphasis, palette.ink);
  }
};

/** Donut segments: one annular sector per slice, one band per level. */
const fillSectors = (
  ctx: CanvasRenderingContext2D,
  nodes: readonly RadialNode[],
  kinds: ReadonlySet<GraphKind>,
  matches: ReadonlySet<string> | null,
  highlight: ReadonlySet<string> | null,
  selected: string | null,
  hovered: string | null,
  palette: Palette,
  inv: number
): void => {
  for (const node of nodes) {
    if (!kinds.has(node.kind) || node.tip <= node.radius) {
      continue;
    }
    const alpha = nodeAlpha(node, matches, highlight);
    const emphasis = node.id === selected || node.id === hovered;
    const a0 = node.a0 - Math.PI / 2;
    const a1 = node.a1 - Math.PI / 2;
    ctx.beginPath();
    ctx.arc(0, 0, node.radius, a0, a1);
    ctx.arc(0, 0, node.tip, a1, a0, true);
    ctx.closePath();
    const color = palette.kinds[node.kind];
    ctx.fillStyle = emphasis
      ? withAlpha(color, alpha * 0.34)
      : withAlpha(palette.ink, alpha * 0.05);
    ctx.fill();
    ctx.strokeStyle = withAlpha(shade(color, 0.55), alpha * 0.85);
    ctx.lineWidth = inv;
    ctx.stroke();
    if (node.kind === "course" && highlight?.has(node.id)) {
      ctx.beginPath();
      ctx.arc(0, 0, node.tip, a0, a1);
      ctx.strokeStyle = withAlpha(palette.kinds.semester, 0.95);
      ctx.lineWidth = 2.4 * inv;
      ctx.stroke();
    }
  }
};

/** The hole carries the wordmark. */
const paintCenter = (ctx: CanvasRenderingContext2D, palette: Palette): void => {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = withAlpha(palette.ink, 0.92);
  ctx.font = "700 64px Satoshi, ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("ISGC", 0, 0);
  ctx.textAlign = "left";
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
  inv: number,
  box: { bottom: number; left: number; right: number; top: number }
): void => {
  ctx.textBaseline = "middle";
  for (const node of nodes) {
    if (!kinds.has(node.kind)) {
      continue;
    }
    if (
      node.tipX < box.left ||
      node.tipX > box.right ||
      node.tipY < box.top ||
      node.tipY > box.bottom
    ) {
      continue;
    }
    const alpha = nodeAlpha(node, matches, highlight);
    const emphasis = node.id === selected || node.id === hovered;
    paintSliceNode(ctx, node, {
      alpha,
      emphasis,
      inv,
      lit: highlight?.has(node.id) ?? false,
      palette,
    });
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
  arcProgress: number;
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
  const { core, highlight } = focusSets(input.layout, hubs);
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
  fillSectors(
    ctx,
    input.layout.nodes,
    input.kinds,
    input.matches,
    highlight,
    selected,
    input.hoveredId,
    input.palette,
    inv
  );
  strokeEdges(
    ctx,
    input.layout,
    input.paths,
    input.kinds,
    core,
    input.palette,
    inv,
    box,
    input.arcProgress
  );
  paintCenter(ctx, input.palette);
  fillNodes(
    ctx,
    input.layout.nodes,
    input.kinds,
    input.matches,
    selected,
    input.hoveredId,
    highlight,
    input.palette,
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

const INSPECTOR_RESERVE_X = 472;
const COMPACT_W = 768;

export const focusOn = (
  wx: number,
  wy: number,
  currentK: number,
  size: { h: number; w: number }
): Transform => {
  const k = clampK(currentK);
  const reserveX =
    size.w >= COMPACT_W ? Math.min(INSPECTOR_RESERVE_X, size.w * 0.42) : 0;
  const sx = (size.w + reserveX) / 2;
  const sy = size.h / 2;
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
