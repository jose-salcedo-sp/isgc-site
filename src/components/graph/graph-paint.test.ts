import { describe, expect, it } from "vitest";

import { FOCUS_K, clampK, focusOn } from "./graph-paint";

describe("graph focus transform", () => {
  it("zooms to FOCUS_K and pans the node onto the open canvas", () => {
    const next = focusOn(100, 50, 0.55, { h: 800, w: 1200 });
    expect(next.k).toBe(FOCUS_K);
    expect(next.x).toBe((1200 - 336) / 2 - 1200 / 2 - 100 * FOCUS_K);
    expect(next.y).toBe(800 / 2 - 800 / 2 - 50 * FOCUS_K);
  });

  it("keeps a higher current zoom", () => {
    const next = focusOn(0, 0, 4, { h: 800, w: 1200 });
    expect(next.k).toBe(4);
  });

  it("shifts up on compact width so the inspector does not cover the node", () => {
    const next = focusOn(0, 0, FOCUS_K, { h: 700, w: 400 });
    expect(next.k).toBe(FOCUS_K);
    expect(next.x).toBe(0);
    expect(next.y).toBe((700 - 280) / 2 - 700 / 2);
  });

  it("clamps extreme zoom", () => {
    expect(focusOn(0, 0, 99, { h: 400, w: 900 }).k).toBe(clampK(99));
  });
});
