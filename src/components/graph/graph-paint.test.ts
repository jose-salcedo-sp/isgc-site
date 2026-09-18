import { describe, expect, it } from "vitest";

import { clampK, focusOn } from "./graph-paint";

describe("graph focus transform", () => {
  it("keeps the current zoom and pans the node clear of the left inspector", () => {
    const next = focusOn(100, 50, 0.55, { h: 800, w: 1200 });
    expect(next.k).toBe(0.55);
    expect(next.x).toBe((1200 + 472) / 2 - 1200 / 2 - 100 * 0.55);
    expect(next.y).toBe(-50 * 0.55);
  });

  it("keeps a higher current zoom", () => {
    const next = focusOn(0, 0, 4, { h: 800, w: 1200 });
    expect(next.k).toBe(4);
  });

  it("centers on compact width where the inspector sits below", () => {
    const next = focusOn(0, 0, 0.7, { h: 700, w: 400 });
    expect(next.k).toBe(0.7);
    expect(next.x).toBe(0);
    expect(next.y).toBe(0);
  });

  it("clamps extreme zoom", () => {
    expect(focusOn(0, 0, 99, { h: 400, w: 900 }).k).toBe(clampK(99));
  });
});
