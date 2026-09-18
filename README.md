# ISGC Site

Personal site built with Next.js, React Compiler, Ultracite (oxlint + anti-slop), Vitest, Knip, jscpd, and React Doctor.

## Stack

Next.js 15 App Router · React 19 · React Compiler · Tailwind v4 · Vitest · Ultracite · React Doctor

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality gates

| Command            | Purpose                                        |
| ------------------ | ---------------------------------------------- |
| `npm run verify`   | typecheck + lint + test + build                |
| `npm run doctor`   | React Doctor health scan (80+ required on PRs) |
| `npm run deadcode` | Knip unused code report                        |
| `npm run dupes`    | jscpd duplicate detection                      |

## CI

- **verify** — runs on every PR and push to `main`
- **React Doctor** — full-project scan on PRs; requires 80+ score and zero new errors

PRs to `main` require code owner approval (see `.github/CODEOWNERS`).

## SEO

Site metadata, sitemap, robots, and JSON-LD live under `src/app/` with shared constants in `src/lib/site.ts`. Production URL is set via `NEXT_PUBLIC_SITE_URL` (falls back to Vercel production URL or `http://localhost:3000`). Sitemap and robots are served at `/sitemap.xml` and `/robots.txt`. Route metadata and sitemap coverage are checked by `src/lib/seo.test.ts` — run `npm run test -- src/lib/seo.test.ts` after changing route metadata.

## Agent context

Read `AGENTS.md` and `.cursor/rules/` before making changes.
