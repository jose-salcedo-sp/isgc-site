# Dictionaries

Edit these JSON files to change site copy. Do not change keys, only values.

| File         | Language                  |
| ------------ | ------------------------- |
| `es.json`    | Spanish (source language) |
| `en-GB.json` | English (United Kingdom)  |
| `en-US.json` | English (United States)   |

Keep the same keys in all three files. Course names and descriptions live under `courses`, keyed by course id. Edit Spanish in `src/data/curriculum.json`, then run `node scripts/sync-course-translations.mjs` to refresh `es.json`. Edit English in `scripts/course-translations.en-GB.json` and `scripts/course-translations.en-US.json`, then run the same sync command.
