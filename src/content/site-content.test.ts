import { describe, expect, it } from "vitest";

import { daysUntil } from "@/content/site-content";

const at = (iso: string) => new Date(iso).getTime();

describe(daysUntil, () => {
  it("counts whole days until the event starts in Guadalajara", () => {
    expect(daysUntil("2026-10-10", at("2026-10-07T12:00:00-06:00"))).toBe(3);
    expect(daysUntil("2026-10-10", at("2026-10-09T23:00:00-06:00"))).toBe(1);
  });

  it("is 0 on the day itself and negative afterwards", () => {
    expect(daysUntil("2026-10-10", at("2026-10-10T09:00:00-06:00"))).toBe(0);
    expect(daysUntil("2026-10-10", at("2026-10-11T09:00:00-06:00"))).toBe(-1);
  });
});
