# SWAT-3 — Content Specification: FAQ section on the home page

**Work ID:** SWAT-3  
**Title:** Add a short FAQ section to the home page  
**Status:** specification (no edits made)  
**Date:** 2026-10-11  

---

## Overview

The FAQ section was added to the home page in an earlier run (`run-20261010204332`, merged as `a4b35d7`). This specification defines the refinements needed to meet acceptance criteria and describes the verification steps for the pipeline.

---

## Acceptance Criteria

The pipeline passes when **all three** of these conditions are met:

### AC 1: Section heading and placement
**Given** the home page,  
**When** a visitor scrolls,  
**Then** a section headed "Frequently asked questions" is present below the existing content.

**Status:** ✓ Met. The FAQ `Section` (with kicker `04 / FAQ`) appears after the "About" section and before the closing "Ready to ship?" banner. The placement is below the main content flow.

---

### AC 2: Three questions with plain-language answers
**Given** that section,  
**When** a visitor reads it,  
**Then** it contains exactly three questions, each with a one- or two-sentence answer in plain language about this project.

**Status:** ✓ Structurally met, with one formatting defect.

The FAQ currently has three questions:
1. "What is ship-a-website?"
2. "What is TNMS Ship and how does it work with ship-a-website?"
3. "How do I get started with ship-a-website?"

Each has a two-sentence answer. However:

**Defect:** The answer to question 3 contains Markdown backticks (`` `npm run dev` ``) inside an `.astro` `<p>` tag. In Astro, Markdown syntax is not parsed inside JSX; the backticks render as literal characters on the page. This breaks the plain-language presentation.

**Fix required:** Replace `` `npm run dev` `` with `<code>npm run dev</code>`.

Optionally: also wrap `` `scripts/site.config.ts` `` in `<code>` to match the style of the "Get started" section above.

---

### AC 3: Rest of the page renders unchanged; site builds
**Given** the existing page,  
**When** the section is added,  
**Then** the rest of the page renders exactly as before and the site still builds with no errors.

**Status:** To verify in the build stage.

The diff in `a4b35d7` adds 28 lines and deletes 0, all within the FAQ `<Section>`. No other components or sections are modified. Verification steps:
- Run `npm run lint` (BEM, ESLint, Stylelint checks)
- Run `npm run build` (Astro build to ensure no errors)
- Visually inspect the rendered page to confirm layout is unchanged

---

## Content Changes Required

### File: `src/pages/index.astro`

**Location:** Lines ~147–150 (the answer to question 3)

**Current:**
```astro
<div>
  <h3 class="font-semibold text-ink-900 mb-2">How do I get started with ship-a-website?</h3>
  <p class="text-sm leading-relaxed text-ink-700">
    Fork the repo, configure your brand in scripts/site.config.ts, run `npm run dev` locally, and then connect TNMS Ship if you want a governed pipeline. See the "Get started" section above for step-by-step instructions.
  </p>
</div>
```

**Required change:**
Replace `` `npm run dev` `` with `<code>npm run dev</code>`.

Optionally, also wrap `` `scripts/site.config.ts` `` in `<code>` tags.

**After (minimum):**
```astro
<div>
  <h3 class="font-semibold text-ink-900 mb-2">How do I get started with ship-a-website?</h3>
  <p class="text-sm leading-relaxed text-ink-700">
    Fork the repo, configure your brand in <code>scripts/site.config.ts</code>, run <code>npm run dev</code> locally, and then connect TNMS Ship if you want a governed pipeline. See the "Get started" section above for step-by-step instructions.
  </p>
</div>
```

---

## Keyword Zone Coverage

No changes to keyword zones are required for SWAT-3.

**Reason:** `src/seo/keywords.ts` contains no registered keywords (only a commented-out example). Without keyword entries, the SEO audit tool cannot measure zone gaps.

**Observations (out of scope for this work item):**
- The page title remains the placeholder "Hello World". This will likely be the first keyword zone gap once keywords are registered.
- The FAQ answers now contain relevant terms ("ship-a-website", "Astro 6", "Tailwind CSS v4", "TNMS Ship", "SEO") that would provide coverage if those keywords are later added to the registry.
- Optional follow-up work: add `FAQPage` JSON-LD structured data to the page for improved search engine understanding.

---

## Analytics Attributes

No new `data-analytics-id` attributes are required for SWAT-3.

**Reason:** The FAQ section contains no links or CTAs. The three existing CTAs on the page (both hero buttons and the closing banner button) already have analytics attributes via component defaults:
- `PageHero`: `hero-cta-primary` and `hero-cta-secondary`
- `CtaStrip`: `cta-strip-primary` and `cta-strip-secondary`

**Note:** A small "About" text link exists in the "Get started" list (added before SWAT-3). It lacks `data-analytics-id`, but adding one is optional and outside this work item's scope.

---

## Redirects

No redirects are needed.

**Reason:** No pages are moved, renamed, or deleted in this work item. `public/_redirects` remains unchanged.

---

## Pipeline Verification Steps

The pipeline passes when:

1. **Formatting fix applied:**
   - Backticks replaced with `<code>` tags in FAQ answer 3.
   - File: `src/pages/index.astro`, lines ~147–150.

2. **Linting passes:**
   ```bash
   npm run lint
   ```
   Expected output: 0 errors (BEM, ESLint, Stylelint).

3. **Build succeeds:**
   ```bash
   npm run build
   ```
   Expected output: Astro builds without errors; output directory created.

4. **SEO lint passes:**
   ```bash
   npm run lint:seo
   ```
   Expected output: `lint:seo T1 keywords: 0/0 covered | 0 warning(s) | 0 error(s)` (no change from audit).

5. **Visual verification:**
   - FAQ section displays with correct formatting (no literal backticks visible).
   - All three questions and answers render in plain language.
   - Rest of the page layout is unchanged.
   - No build warnings about unused classes or broken imports.

---

## Summary

| Aspect | Required action | Status |
|--------|-----------------|--------|
| Heading and placement | None (already present) | ✓ Met |
| Three questions with answers | Fix backticks in Q3 answer | ⚠ Fix required |
| Build verification | Run lint and build | To verify |
| Keyword zones | None | ✓ Not applicable |
| Analytics attributes | None | ✓ Not needed |
| Redirects | None | ✓ Not needed |

**Next stage:** Apply the backtick fix to `src/pages/index.astro` and verify all checks pass.
