# ISGC Site — agent briefing

Personal Next.js App Router site. Strict linting, anti-slop rules, Vitest, and React Doctor.

## Stack

Next.js App Router (TS, strict) · React 19 · React Compiler · Tailwind v4 · Vitest · Ultracite (oxlint + oxfmt + anti-slop).

## Commands

| Purpose | Command | Healthy output |
| --- | --- | --- |
| Dev server | `npm run dev` | Next on :3000 |
| Typecheck | `npm run typecheck` | no output, exit 0 |
| Lint/format | `npm run check` / `npm run fix` | ultracite: 0 errors |
| Dead code | `npm run deadcode` | knip report (not in `verify`) |
| Duplicates | `npm run dupes` | jscpd report (not in `verify`) |
| Unit tests | `npm run test` | all passed |
| Build | `npm run build` | exit 0 |
| Full gate | `npm run verify` | typecheck + check + test + build, exit 0 |
| React audit | `npm run doctor` | react-doctor report (80+ required in CI) |

## Layout

```
src/
  app/           Next.js routes
  lib/           shared utilities and tests
.cursor/rules/   project rules Cursor injects into every session
```

## Workflow

PRs are reviewed against `REVIEW.md`. CI must pass `verify` and React Doctor (80+ score, no new errors).

## Ultracite Code Standards

This project uses **Ultracite** with **anti-slop** rules via oxlint. Run `npm run fix` before committing.

- Format code: `npm run fix`
- Check for issues: `npm run check`
- Most issues are automatically fixable

Write code that is accessible, performant, type-safe, and maintainable. Use function components, semantic HTML, and Next.js `<Image>` for images. No `console.log` in production code.
