# SWAT-2 — Content audit

**Title:** Merge proof: the staging merge stage delivers a real PR (TNM-816)
**Stage:** audit (read-only — no edits made)

## Scope

SWAT-2 is a pipeline harness item. Its deliverable is a marker file,
`merge-proof/SWAT-2.txt`, that gives the staging merge stage a real diff to
open and merge a PR into `main`. It does not ask for any change to a page,
content entry, layout, or component.

## Affected files

| File | In site_root / content_root? | Notes |
|---|---|---|
| `merge-proof/SWAT-2.txt` | No | Plain-text marker (already on `main`, contains `2026-10-09T09:43:36Z`). Not built or routed by Astro. |

No files under `src/pages` or `src/content` are affected.

## Keyword zone gaps

None for this item. `optimize-content.ts` only applies to `.astro` / `.mdx`
sources, and none are in scope.

Baseline check (for reference only, not a gap caused by this item):

- `node --experimental-strip-types scripts/optimize-content.ts src/pages/index.astro`
  → "No keywords in src/seo/keywords.ts are mapped to: src/pages/index.astro"
- `npm run lint:seo` → `T1 keywords: 0/0 covered | 0 warning(s) | 0 error(s)`

The keyword registry has no Tier 1 entries, so there are no zone gaps
(title / description / headings / body) to record.

## CTAs missing `data-analytics-id`

None. No CTAs are added, changed, or removed by this item.

## Redirects

None needed. No pages are moved or deleted.

## Recommendation for downstream stages

- Spec / edit: no-op for site content.
- SEO / analytics / build stages should pass unchanged.
