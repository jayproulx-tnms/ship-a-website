# SWAT-2 — Content specification

**Title:** Merge proof: the staging merge stage delivers a real PR (TNM-816)
**Stage:** spec (defines edit requirements)

## Purpose

SWAT-2 is a pipeline harness item for validating the **staging merge workflow**.
Its deliverable is a successful PR merge into `main` that **does not change site
content**. This tests that the merge-proof pipeline can:

1. Branch from `main`
2. Create a diff (marker file only)
3. Commit and push
4. Open a real GitHub PR
5. Merge to `main` via the merge bookend stage
6. Log "Delivery verified" post-merge

The pipeline is shell-only and does not invoke the content edit stage.

---

## Content changes required

**None.** No changes to site content, copy, headings, CTAs, or redirects.

---

## Keyword zones

**Not applicable.** No `.astro` or `.mdx` sources are edited.

---

## CTAs requiring `data-analytics-id`

**None.** No CTAs are added, changed, or removed.

---

## Redirects to add

**None.** No pages are moved or deleted. `public/_redirects` remains unchanged.

---

## What the pipeline will change

| File | Change | Reason |
|---|---|---|
| `merge-proof/SWAT-2.txt` | Write timestamp (already on `main`) | Gives the staging merge stage a real diff to demonstrate the workflow. |

This marker file is not processed by Astro and does not affect the site build,
SEO coverage, analytics attributes, or any content zone.

---

## Acceptance criteria

This pipeline run is **Done** when all of the following pass:

1. ✓ **Audit stage:** Finds zero content gaps (read-only)
2. ✓ **Edit stage:** No-op (no source files edited)
3. ✓ **SEO stage:** `npm run lint:seo` passes with zero errors and zero warnings
4. ✓ **Analytics stage:** No missing `data-analytics-id` attributes
5. ✓ **Build stage:** `npm run build` succeeds; all 14 pages render
6. ✓ **Merge stage:** PR is opened and merged to `main` via merge bookend
7. ✓ **Post-merge:** Pipeline logs "Delivery verified" before closing this item Done

If any of these fail, the pipeline fails and this item remains in progress.

---

## Notes for downstream stages

- **Edit:** No source files to edit. Skip and mark as verified.
- **SEO / Analytics / Build:** Run full checks to confirm no regressions.
- **Merge:** Leave the merge to the merge bookend stage (do not merge manually).
