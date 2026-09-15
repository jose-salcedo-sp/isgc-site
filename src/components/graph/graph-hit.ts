export interface PointNode {
  id: string;
  x: number;
  y: number;
}

export interface HitGrid<T extends PointNode> {
  buckets: Map<string, T[]>;
  size: number;
}

const keyOf = (ix: number, iy: number): string => `${ix}:${iy}`;

export const buildHitGrid = <T extends PointNode>(
  nodes: readonly T[],
  size = 32
): HitGrid<T> => {
  const buckets = new Map<string, T[]>();
  for (const node of nodes) {
    const key = keyOf(Math.floor(node.x / size), Math.floor(node.y / size));
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.push(node);
    } else {
      buckets.set(key, [node]);
    }
  }
  return { buckets, size };
};

export const findNear = <T extends PointNode>(
  grid: HitGrid<T>,
  x: number,
  y: number,
  radius: number
): T | null => {
  const { buckets, size } = grid;
  const minX = Math.floor((x - radius) / size);
  const maxX = Math.floor((x + radius) / size);
  const minY = Math.floor((y - radius) / size);
  const maxY = Math.floor((y + radius) / size);
  let best: T | null = null;
  let bestD = radius * radius;
  for (let ix = minX; ix <= maxX; ix += 1) {
    for (let iy = minY; iy <= maxY; iy += 1) {
      const bucket = buckets.get(keyOf(ix, iy));
      if (!bucket) {
        continue;
      }
      for (const node of bucket) {
        const dx = node.x - x;
        const dy = node.y - y;
        const d2 = dx * dx + dy * dy;
        if (d2 <= bestD) {
          best = node;
          bestD = d2;
        }
      }
    }
  }
  return best;
};
