# SWAT-2 — Content specification

**Item:** Merge proof: the staging merge stage delivers a real PR (TNM-816)
**Date:** 2026-10-10
**Based on:** [audit.md](./audit.md)

## Work summary

SWAT-2 is a pipeline test harness for the staging lane. It is **not a content change**. The pipeline writes a timestamp marker (`merge-proof/SWAT-2.txt`) and tests the complete merge-to-main workflow. No pages, content collections, or components are modified.

## Content changes required

**None.** SWAT-2 does not add, modify, or delete any page or collection content under `src/pages/` or `src/content/`.

| File | Action | Rationale |
|---|---|---|
| (all content files) | No change | Pipeline is shell-only; only writes `merge-proof/SWAT-2.txt` |

## Keyword coverage

No keyword coverage changes needed. The timestamp file is not part of SEO tracking, and no tracked pages are modified.

| Zone | Changes | Rationale |
|---|---|---|
| title | None | No pages affected |
| description | None | No pages affected |
| headings | None | No pages affected |
| body | None | No pages affected |

Tier 1 keyword coverage remains unchanged. `npm run lint:seo` must pass without modifications to existing content.

## Analytics instrumentation

No CTAs are added or modified. The timestamp file contains no interactive elements.

| CTA | `data-analytics-id` | Rationale |
|---|---|---|
| (none) | N/A | No markup in commit |

## Redirects

**None.** No pages are moved, renamed, or deleted.

| Source | Target | Reason |
|---|---|---|
| (none) | (none) | No routing changes |

Public `_redirects` file does not need updates.

## Acceptance criteria

This merge closes when **all** conditions are met:

1. ✅ **Build succeeds:** `npm run build` completes with exit code 0
2. ✅ **No lint errors:** `npm run lint` exits clean (BEM, SEO, token rules pass)
3. ✅ **No regressions:** All existing pages render without errors
4. ✅ **Merge commit applied:** PR is merged into `main` by the merge bookend
5. ✅ **Post-merge signal:** Pipeline logs "Delivery verified at phase post-merge"

**Failure criteria:** If any build, lint, or render check fails, the merge is blocked. The commit `merge-proof/SWAT-2.txt` must not introduce build failures.

## Next stages

- **Design / Engineering:** Build verification only; no component or template changes
- **Merge:** Apply the merge to `main`
- **Post-merge:** Log completion and close SWAT-2 Done
