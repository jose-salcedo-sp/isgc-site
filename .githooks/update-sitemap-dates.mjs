import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const siteFile = "src/lib/site.ts";
const trigger =
  /^src\/(?:app\/(?:.+\/)?page\.tsx|app\/sitemap\.ts|lib\/site\.ts)$/u;

const staged = execSync("git diff --cached --name-only --diff-filter=ACMR", {
  encoding: "utf-8",
})
  .trim()
  .split("\n")
  .filter(Boolean);

if (!staged.some((file) => trigger.test(file))) {
  process.exit(0);
}

const today = `${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`;
const pattern = /^export const siteLastModified = new Date\("[^"]+"\);$/mu;
const replacement = `export const siteLastModified = new Date("${today}");`;

const source = readFileSync(siteFile, "utf-8");
if (!pattern.test(source)) {
  console.error(
    "pre-commit: siteLastModified pattern not found in src/lib/site.ts"
  );
  process.exit(1);
}

const updated = source.replace(pattern, replacement);
if (updated === source) {
  process.exit(0);
}

writeFileSync(siteFile, updated);
execSync(`git add ${siteFile}`, { stdio: "inherit" });
console.log(`Updated siteLastModified to ${today}`);
