# Nexus App

Next.js starter based on [Axios-Intelligence/nexus](https://github.com/Axios-Intelligence/nexus) tooling — React Compiler, Ultracite (oxlint + anti-slop), Vitest, Knip, jscpd, and React Doctor.

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

## Agent context

Read `AGENTS.md` and `.cursor/rules/` before making changes.
