import { readFileSync, writeFileSync } from "node:fs";

import enGB from "./course-translations.en-GB.json" with { type: "json" };
import enUS from "./course-translations.en-US.json" with { type: "json" };

const curriculum = JSON.parse(
  readFileSync("src/data/curriculum.json", "utf-8")
);

/** @type {Record<string, { description: string; name: string }>} */
const es = Object.fromEntries(
  curriculum.courses.map((course) => [
    course.id,
    { description: course.description, name: course.name },
  ])
);

const locales = {
  "en-GB": enGB,
  "en-US": enUS,
  es,
};

for (const course of curriculum.courses) {
  for (const locale of ["en-GB", "en-US"]) {
    if (!locales[locale][course.id]) {
      throw new Error(`Missing ${locale} translation for ${course.id}`);
    }
  }
}

for (const [locale, courses] of Object.entries(locales)) {
  const path = `src/dictionaries/${locale}.json`;
  const dict = JSON.parse(readFileSync(path, "utf-8"));
  dict.courses = courses;
  writeFileSync(path, `${JSON.stringify(dict, null, 2)}\n`);
}

console.log(`Synced ${curriculum.courses.length} courses to dictionaries.`);
