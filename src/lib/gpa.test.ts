import { describe, expect, it } from "vitest";

import { computeGpa } from "@/lib/gpa";

const gpaFor = (grade: number) => computeGpa([{ credits: 8, grade }])?.gpa;

describe("GPA calculation", () => {
  it("returns null when no course has a grade", () => {
    expect(computeGpa([])).toBeNull();
  });

  it("gives 4 points from 9 up and 3 points from 8", () => {
    expect(gpaFor(10)).toBe(4);
    expect(gpaFor(9)).toBe(4);
    expect(gpaFor(8.9)).toBe(3);
  });

  it("gives 2, 1 and 0 points for the lower bands", () => {
    expect(gpaFor(7)).toBe(2);
    expect(gpaFor(6)).toBe(1);
    expect(gpaFor(5.9)).toBe(0);
  });

  it("weights the average and GPA by credits", () => {
    const result = computeGpa([
      { credits: 8, grade: 10 },
      { credits: 4, grade: 7 },
    ]);
    expect(result?.credits).toBe(12);
    expect(result?.average).toBe(9);
    expect(result?.gpa).toBeCloseTo(10 / 3);
  });
});
