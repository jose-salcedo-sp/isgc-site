import { describe, expect, it } from "vitest";

import enGB from "@/dictionaries/en-GB.json";
import enUS from "@/dictionaries/en-US.json";
import es from "@/dictionaries/es.json";
import type { Dictionary } from "@/lib/dictionary";
import { negotiateLocale, stripLocale } from "@/lib/i18n";

const pageKeys = (dict: Dictionary) => Object.keys(dict.pages).toSorted();
const topKeys = (dict: Dictionary) => Object.keys(dict).toSorted();

describe("i18n", () => {
  it("keeps the same dictionary keys in every locale", () => {
    expect(topKeys(enGB)).toStrictEqual(topKeys(es));
    expect(topKeys(enUS)).toStrictEqual(topKeys(es));
    expect(pageKeys(enGB)).toStrictEqual(pageKeys(es));
    expect(pageKeys(enUS)).toStrictEqual(pageKeys(es));
  });

  it("negotiates locale from Accept-Language", () => {
    expect(negotiateLocale("en-GB,en;q=0.8")).toBe("en-GB");
    expect(negotiateLocale("en-US,en;q=0.5")).toBe("en-US");
    expect(negotiateLocale("es-MX,es;q=0.9")).toBe("es");
    expect(negotiateLocale(null)).toBe("es");
  });

  it("strips the locale prefix from a pathname", () => {
    expect(stripLocale("/es")).toBe("/");
    expect(stripLocale("/en-GB/carrera")).toBe("/carrera");
    expect(stripLocale("/en-US/alumnos")).toBe("/alumnos");
  });
});
