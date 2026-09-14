# Review contract

The standard every PR in this repo is reviewed against.

## Output discipline

- Cite `path:line` for every finding.
- Rank: **blocker** / **important** / **nit**.
- State the failure, not the feeling.
- Cap at the top 10 findings per pass.

## Passes

### 1. Correctness

Logic errors, unhandled rejections, error paths that swallow.

### 2. Security

- No secrets in client code or committed files.
- Remote data parsed with schema validation, not cast with `as`.
- Authorization checked server-side, not only in the UI.
- New dependency: is it needed, maintained, and minimal?

### 3. Performance

- Request waterfalls; sequential work that could be parallel.
- Bundle delta — flag new dependencies on the critical path.
- Re-render churn: unstable deps, inline component definitions.

### 4. Tests

- Does a test fail if the change is reverted?
- Edge cases covered, not only the happy path.

### 5. Accessibility

Keyboard reachable, focus managed, async state announced. Run on UI diffs only.

### 6. Slop — always run, last

- Duplicated logic when an existing implementation exists.
- Single-use abstractions.
- Comments that restate the code.
- Defensive code with no named failure.
- Dead exports, unused props, ownerless TODOs.
- Generic naming: `data`, `item`, `handleX`, `utils`.

## Exclusions

- Formatting and import order — `oxfmt` owns those.
- Generated files and lockfiles.
- Pre-existing issues outside the diff.

## Severity

| Tier | Action |
| --- | --- |
| **blocker** | Do not merge |
| **important** | Fix before merge or file with an owner |
| **nit** | Author's discretion |
